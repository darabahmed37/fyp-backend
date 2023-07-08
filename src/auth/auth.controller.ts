import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { Public } from 'utils/custom.decorator';
import { UserService } from 'user/user.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refreshToken(@Body() body) {
    try {
      return await this.authService.refreshToken(body.refresh_token);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post('signup')
  async signUp(@Body() body: any) {
    console.log("Hello")
    await this.authService.create(body);
    return {
      "message":"CreateDateColumn"
    }
  }
}
