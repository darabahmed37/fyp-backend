import { Body, Controller, HttpException, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { JWTAuthGuard } from 'auth/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @Post('login')
  async login(@Body() body) {
    let user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return this.authService.login(user);
  }
}
