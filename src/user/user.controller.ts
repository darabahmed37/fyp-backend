import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from 'user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() user: any) {
    return await this.userService.create(user.username, user.password);
  }
}
