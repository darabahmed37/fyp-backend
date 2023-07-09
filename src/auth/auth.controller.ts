import {
  Body,
  Controller,
  HttpException,UnauthorizedException,
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
    await this.authService.create(body);
    return {
      message: 'Created',
    };
  }

  @Post('signin')
  async signIn(@Body() body: any) {
    let user = await this.authService.validateUser(
        body.username,
        body.password,
    );
    if (user) {
      return await this.authService.login(user);
    } else throw new UnauthorizedException("Invalid Cred")
  }}