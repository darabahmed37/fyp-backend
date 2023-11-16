import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/user.model';
import * as crypto from 'crypto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user object if validation is successful', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'testpass';
      const salt = 'mocksalt';
      const mockUser = new User();
      mockUser.username = username;
      mockUser.password = `${salt}$mockhash`;

      mockUserService.findOne.mockResolvedValue(mockUser);
      const cryptoSpy = jest.spyOn(crypto, 'pbkdf2Sync');
      cryptoSpy.mockReturnValue(Buffer.from('mockhash', 'hex'));

      // Act
      const result = await authService.validateUser(username, password);

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUserService.findOne).toHaveBeenCalledWith(
        'username',
        username,
      );
      expect(cryptoSpy).toHaveBeenCalledWith(
        password,
        salt,
        1000,
        64,
        'sha512',
      );
    });

    it('should return null if user is not found', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'testpass';

      mockUserService.findOne.mockResolvedValue(null);

      // Act
      const result = await authService.validateUser(username, password);

      // Assert
      expect(result).toBeNull();
      expect(mockUserService.findOne).toHaveBeenCalledWith(
        'username',
        username,
      );
    });

    it('should return null if password validation fails', async () => {
      // Arrange
      const username = 'testuser';
      const password = 'testpass';
      const salt = 'mocksalt';
      const mockUser = new User();
      mockUser.username = username;
      mockUser.password = `${salt}$invalidhash`;

      mockUserService.findOne.mockResolvedValue(mockUser);
      const cryptoSpy = jest.spyOn(crypto, 'pbkdf2Sync');
      cryptoSpy.mockReturnValue(Buffer.from('mockhash', 'hex'));

      // Act
      const result = await authService.validateUser(username, password);

      // Assert
      expect(result).toBeNull();
      expect(mockUserService.findOne).toHaveBeenCalledWith(
        'username',
        username,
      );
      expect(cryptoSpy).toHaveBeenCalledWith(
        password,
        salt,
        1000,
        64,
        'sha512',
      );
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens', () => {
      // Arrange
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.username = 'testuser';

      const mockAccessToken = 'mockAccessToken';
      const mockRefreshToken = 'mockRefreshToken';
      mockJwtService.sign.mockReturnValueOnce(mockAccessToken);
      mockJwtService.sign.mockReturnValueOnce(mockRefreshToken);

      // Act
      const result = authService.login(mockUser);

      // Assert
      expect(result).toEqual({
        access_token: mockAccessToken,
        refresh_token: mockRefreshToken,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        id: mockUser.id,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { username: mockUser.username, id: mockUser.id },
        { expiresIn: '7d' },
      );
    });
  });

  describe('refreshToken', () => {
    it('should return new access token if refresh token is valid and user exists', async () => {
      // Arrange
      const mockRefreshToken = 'mockRefreshToken';
      const mockUser = new User();
      mockUser.id = 1;

      const mockAccessToken = 'mockAccessToken';
      const payload = { username: mockUser.username, id: mockUser.id };
      mockJwtService.verify.mockReturnValue(payload);
      mockJwtService.sign.mockReturnValue(mockAccessToken);

      mockUserService.findOne.mockResolvedValue(mockUser);

      // Act
      const result = await authService.refreshToken(mockRefreshToken);

      // Assert
      expect(result).toBe(mockAccessToken);
      expect(mockJwtService.verify).toHaveBeenCalledWith(mockRefreshToken);
      expect(mockUserService.findOne).toHaveBeenCalledWith('id', payload.id);
      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
    });

    it('should throw an error if refresh token is invalid', async () => {
      // Arrange
      const mockRefreshToken = 'invalidRefreshToken';
      mockJwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act and Assert
      await expect(
        authService.refreshToken(mockRefreshToken),
      ).rejects.toThrowError('token_not_valid');
      expect(mockJwtService.verify).toHaveBeenCalledWith(mockRefreshToken);
    });

    it('should throw an error if refresh token is expired', async () => {
      // Arrange
      const mockRefreshToken = 'expiredRefreshToken';
      const payload = { exp: Math.floor(Date.now() / 1000) - 3600, id: 1 };
      mockJwtService.verify.mockReturnValue(payload);

      // Act and Assert
      await expect(
        authService.refreshToken(mockRefreshToken),
      ).rejects.toThrowError('Refresh token expired');
      expect(mockJwtService.verify).toHaveBeenCalledWith(mockRefreshToken);
    });

    it('should throw an error if user does not exist', async () => {
      // Arrange
      const mockRefreshToken = 'validRefreshToken';
      const payload = { exp: Math.floor(Date.now() / 1000) + 3600, id: 1 };
      mockJwtService.verify.mockReturnValue(payload);

      mockUserService.findOne.mockResolvedValue(null);

      // Act and Assert
      await expect(
        authService.refreshToken(mockRefreshToken),
      ).rejects.toThrowError('User not found');
      expect(mockJwtService.verify).toHaveBeenCalledWith(mockRefreshToken);
      expect(mockUserService.findOne).toHaveBeenCalledWith('id', payload.id);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const mockUser = new User();

      // Act
      await authService.create(mockUser);

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
    });
  });
});
