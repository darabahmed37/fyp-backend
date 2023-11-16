import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommentsService } from 'comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('create')
  async createComment(@Body('from') from: string, @Body('to') to: string) {
    return await this.commentsService.addComment('test', +from, +to);
  }

  @Get('get')
  async getComments(@Body('id') id: string) {
    return await this.commentsService.getCommentsByServiceUser(+id);
  }
}
