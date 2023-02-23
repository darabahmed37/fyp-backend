import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('test')
export class TestController {
  @Get()
  test(@Req() request: Request) {
    return request.user;
  }
}
