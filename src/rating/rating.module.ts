import {Module} from '@nestjs/common';
import {RatingService} from './rating.service';
import {RatingController} from './rating.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Rating} from "rating/rating.model";

@Module({
    imports: [TypeOrmModule.forFeature([Rating])],
    providers: [RatingService],
    controllers: [RatingController]
})
export class RatingModule {
}
