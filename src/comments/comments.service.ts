import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'comments/comments.model';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async getCommentsByService(id: number): Promise<Comments[]> {
    return await this.commentsRepository.find({
      where: {
        to: {
          id: id,
        },
      },
    });
  }

  async addComment(
    comment: string,
    from: number,
    to: number,
  ): Promise<Comments> {
    let temp = this.commentsRepository.create({
      comment: comment,
      from: {
        id: from,
      },
      to: {
        id: to,
      },
    });
    return await this.commentsRepository.save(temp);
  }
}
