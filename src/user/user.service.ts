import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'user/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string, ...information) {
    let user = await this.findOne('username', username);
    if (user) {
      throw new ConflictException('User already exists');
    }
    if (password.length < 8) {
      throw new ConflictException(
        'Password must be at least 8 characters long',
      );
    }
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    password = salt + '$' + hash;

    let newUser = this.userRepository.create({
      username,
      password,
      ...information,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOne(key: string, value: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { [key]: value },
    });
  }
}
