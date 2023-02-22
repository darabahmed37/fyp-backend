import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { JWTAuthGuard } from './jwt-guard';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '60m' },
  }), PassportModule],
  providers: [AuthService, JwtStrategy, JWTAuthGuard],
  controllers: [],
  exports: [JWTAuthGuard],
})
export class AuthModule {
}
