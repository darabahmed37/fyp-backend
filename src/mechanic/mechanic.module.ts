import { Module } from '@nestjs/common';
import { MechanicController } from './mechanic.controller';
import { MechanicService } from './mechanic.service';
import {UserModule} from "user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "user/user.model";
import {Mechanic} from "mechanic/mechanic.model";

@Module({
  imports:[TypeOrmModule.forFeature([User,Mechanic])],
  controllers: [MechanicController],
  providers: [MechanicService]
})
export class MechanicModule {}
