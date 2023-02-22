import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { Public } from 'custom/custom.decorator';
import { UserService } from 'user/user.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
  }

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
    let user = await this.userService.create(body.username, body.password);
    return this.authService.login(user);
  }
}
