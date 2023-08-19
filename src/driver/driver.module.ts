import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import {UserModule} from "user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "user/user.model";
import {Driver} from "driver/driver.model";

@Module({
  imports:[TypeOrmModule.forFeature([User,Driver])],
  controllers: [DriverController],
  providers: [DriverService]
})
export class DriverModule {}
