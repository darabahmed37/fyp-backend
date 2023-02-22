import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { User } from 'user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne('username', username);
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


  async refreshToken(refreshToken: string)  {
    const payload = this.jwtService.verify(refreshToken);

    const expired = payload.exp * 1000;
    if (Date.now() >= expired) {
      throw new Error('Refresh token expired');
    }

    const user = await this.userService.findOne('id', payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.login(user);
  }


}
