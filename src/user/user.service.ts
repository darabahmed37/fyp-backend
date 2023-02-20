import { Injectable } from '@nestjs/common';
import { User } from 'user/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  async signUp(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

}
