import { Module } from '@nestjs/common';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FeaturesModel} from "features/features.model";

@Module({
  imports:[TypeOrmModule.forFeature([FeaturesModel])],
  providers: [FeaturesService],
  controllers: [FeaturesController]
})
export class FeaturesModule {}
