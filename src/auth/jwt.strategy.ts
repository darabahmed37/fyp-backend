import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JWT_SECRET',
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    let user = await this.userService.findOne('id', payload.id);
    if (!user) {
      throw new NotAcceptableException('Invalid Token');
    }
    return user;
  }
}
