import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTAuthGuard } from 'auth/jwt-guard';
import { CONFIGURATIONS } from 'custom/configurations';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: CONFIGURATIONS.DB_HOST,
      port: CONFIGURATIONS.DB_PORT,
      password: CONFIGURATIONS.DB_PASSWORD,
      username: CONFIGURATIONS.DB_USERNAME,
      database: CONFIGURATIONS.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_GUARD',
    useClass: JWTAuthGuard,
  }],

})
export class AppModule {
}

