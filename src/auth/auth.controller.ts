import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { Public } from 'utils/custom.decorator';
import { UserService } from 'user/user.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signin')
  async login(@Body() body) {
    let user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signUp(@Body() body) {
    let user = await this.userService.create(
      body.username,
      body.password,
      ...body,
    );
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Body() body) {
    try {
      return await this.authService.refreshToken(body.refresh_token);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
