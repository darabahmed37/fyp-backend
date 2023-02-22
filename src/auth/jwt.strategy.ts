import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    let user = await this.userService.findOne('id', payload.id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }
}
