import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Request } from 'express';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            getUserServices: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockUser = { id: 1, username: 'testuser' };
      const request = { user: mockUser } as Request;

      const result = await userController.getProfile(request);

      expect(result).toEqual(mockUser);
    });
  });

  describe('checkUserName', () => {
    it('should return true if username is available', async () => {
      const mockQueryParams = { username: 'newuser' };
      userService.findOne = jest.fn().mockResolvedValue(null);

      const result = await userController.checkUserName(mockQueryParams);

      expect(result).toBe(true);
    });

    it('should return false if username is already taken', async () => {
      const mockQueryParams = { username: 'existinguser' };
      userService.findOne = jest.fn().mockResolvedValue({ id: 1, username: 'existinguser' });

      const result = await userController.checkUserName(mockQueryParams);

      expect(result).toBe(false);
    });
  });

  describe('getUserServices', () => {
    it('should return user services', async () => {
      const mockUserId = 1;
      const mockUser = { id: mockUserId };
      const mockRequest = { user: mockUser } as Request;
      userService.getUserServices = jest.fn().mockResolvedValue(['service1', 'service2']);

      const result = await userController.getUserServices(mockRequest);

      expect(result).toEqual(['service1', 'service2']);
    });
  });
});
