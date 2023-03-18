import {Controller, Get, Post} from '@nestjs/common';
import {CommentsService} from "comments/comments.service";

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {

    }

    @Post("create")
    async createComment() {
        return await this.commentsService.addComment("test", 1, 1);
    }

    @Get("get")
    async getComments() {
        return await this.commentsService.getCommentsByServiceUser(1);
    }
}
