import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from 'auth/jwt-guard';
import { databaseConfig } from 'utils/configurations';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TestModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JWTAuthGuard,
    },
  ],
})
export class AppModule {}
