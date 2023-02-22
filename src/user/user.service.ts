import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'user/user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: Repository<User>) {
  }

  async create(username: string, password: string): Promise<User> {
    let newUser = this.userRepository.create({ username, password });
    return await this.userRepository.save(newUser);
  }

  async findOne(key: string, value: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ [key]: value });

  }
}