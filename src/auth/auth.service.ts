import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { User } from 'user/user.model';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne('username', username);
    if (!user) return null;
    let salt = user.password.split('$')[0];
    let hash = crypto
      .pbkdf2Sync(pass, salt, 1000, 64, 'sha512')
      .toString('hex');
    pass = salt + '$' + hash;

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    let payload = {
      username: user.username,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(refreshToken: string) {
    let payload = undefined;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (e) {
      return 'token_not_valid';
    }

    const expired = payload.exp * 1000;
    if (Date.now() >= expired) {
      throw new Error('Refresh token expired');
    }

    const user = await this.userService.findOne('id', payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    return (await this.login(user)).access_token;
  }

  async create(user: User) {
    await this.userService.create(user);
  }
}
