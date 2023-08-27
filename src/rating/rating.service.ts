import {Get, Injectable, Param, Post} from '@nestjs/common';
import {Rating} from 'rating/rating.model';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from "user/user.model";

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,
    ) {
    }

    @Post(':id')
    async findAll(@Param('id') userServiceId: number): Promise<Rating[]> {
        return await this.ratingRepository.find({
            where: {
                to: {
                    id: userServiceId,
                },
            },
        });
    }

    @Get()
    async create(stars: number, from: User, to: number): Promise<Rating> {

        let newRating = this.ratingRepository.create({
            stars: stars,
            from,
            to: {
                id: to,
            },
        });
        return await this.ratingRepository.save(newRating);
    }
}
