import { ConflictException, Injectable } from '@nestjs/common';
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
    let user =await this.findOne('username', username);
    if (user) {
      throw new ConflictException('User already exists');
    }
    let newUser = this.userRepository.create({ username, password });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOne(key: string, value: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { [key]: value },
    });
  }
}
