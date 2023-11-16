import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { JWTAuthGuard } from './jwt-guard';
import { AuthController } from './auth.controller';
import { UserService } from 'user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanic } from 'mechanic/mechanic.model';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'JWT_SECRET',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule,
    TypeOrmModule.forFeature([Mechanic]),
  ],
  providers: [AuthService, JwtStrategy, JWTAuthGuard],
  controllers: [AuthController],
  exports: [JWTAuthGuard],
})
export class AuthModule {}
