import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ConflictException } from '@nestjs/common';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  const mockCommentsService = {
    addComment: jest.fn(),
    getCommentsByServiceUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  describe('createComment', () => {
    it('should create and return a new comment', async () => {
      // Arrange
      const mockComment = { id: 1, comment: 'Test comment' };
      mockCommentsService.addComment.mockResolvedValue(mockComment);

      // Act
      const result = await commentsController.createComment();

      // Assert
      expect(result).toEqual(mockComment);
      expect(mockCommentsService.addComment).toHaveBeenCalledWith('test', 1, 1);
    });

    it('should throw a ConflictException for self-comment', async () => {
      // Arrange
      mockCommentsService.addComment.mockRejectedValue(new ConflictException("You can't comment on yourself"));

      // Act and Assert
      await expect(commentsController.createComment()).rejects.toThrowError(ConflictException);
    });
  });

  describe('getComments', () => {
    it('should return an array of comments for a service user', async () => {
      // Arrange
      const mockComments = [{ id: 1, comment: 'Test comment 1' }, { id: 2, comment: 'Test comment 2' }];
      mockCommentsService.getCommentsByServiceUser.mockResolvedValue(mockComments);

      // Act
      const result = await commentsController.getComments();

      // Assert
      expect(result).toEqual(mockComments);
      expect(mockCommentsService.getCommentsByServiceUser).toHaveBeenCalledWith(1);
    });
  });
});
