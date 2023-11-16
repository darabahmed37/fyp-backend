import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { User } from 'user/user.model';
import * as crypto from 'crypto';
import Role from 'role/role.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Mechanic } from 'mechanic/mechanic.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Mechanic) private driverRepo: Repository<Mechanic>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne('username', username);
    if (!user) return null;

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
    let newUser = await this.userService.create(user);
    if (newUser.role == Role.MECHANIC) {
      let mechanic = this.driverRepo.create({
        user: newUser,
        services: [],
      });
      await this.driverRepo.save(mechanic);
    }
  }

  updatePassword(username: string, password: string) {
    return this.userService.updatePassword(username, password);
  }
}
