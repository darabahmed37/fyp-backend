import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().DB_HOST,
      port: config().DB_PORT,
      username: config().DB_USER,
      password: config().DB_PASSWORD,
      database: config().DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
