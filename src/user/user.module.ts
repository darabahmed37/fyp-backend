import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'user/user.model';
import { UserController } from './user.controller';
import {Roles} from "role/role.model";

@Module({
  imports: [TypeOrmModule.forFeature([User,Roles])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
