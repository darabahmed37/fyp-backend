import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'user/user.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async create(username: string, password: string) {
    let newUser = this.userRepository.create({ username, password });
    await this.userRepository.save(newUser);
  }

  async findOne(key: string, value: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ [key]: value });
  }
}
