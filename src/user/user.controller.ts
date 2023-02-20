import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { User } from 'user/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('signup')

  async signUp(@Body() user: User): Promise<User> {
    return await this.userService.signUp(user);
  }
}
