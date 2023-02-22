import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { JWTAuthGuard } from 'auth/jwt-guard';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'darab',
    username: 'darab',
    database: 'fyp-backend-database',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {
}
