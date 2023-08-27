import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import { RatingService } from 'rating/rating.service';
import { Rating } from 'rating/rating.model';
import {Request} from "express";

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':id')
  async findAll(@Param('id') userServiceId: number): Promise<Rating[]> {
    return await this.ratingService.findAll(userServiceId);
  }

  @Post()
  async addRating(
    @Body('stars') stars: number,
    @Body('to') to: number,
    @Req() request:Request
  ): Promise<Rating> {
    return await this.ratingService.create(stars, request.user, to);
  }
}
