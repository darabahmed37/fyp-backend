import {Controller} from '@nestjs/common';
import {CommentsService} from "comments/comments.service";

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {

    }

    async createComment() {
        return await this.commentsService.addComment("test", 1, 1);
    }
}
