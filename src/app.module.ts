import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from 'auth/jwt-guard';
import { databaseConfig } from 'utils/configurations';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from 'comments/comments.module';
import { RatingModule } from 'rating/rating.module';
import { RoleModule } from 'role/role.module';
import { FeaturesModule } from 'features/features.module';
import { MechanicModule } from 'mechanic/mechanic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig(),
    }),
    CommentsModule,
    RatingModule,
    RoleModule,
    FeaturesModule,
    MechanicModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JWTAuthGuard,
    },

    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
