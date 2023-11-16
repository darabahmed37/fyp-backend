import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Repository } from 'typeorm';
import { Comments } from './comments.model';
import { ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'user/user.model';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let commentsRepository: Repository<Comments>;

  const mockCommentsRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comments),
          useValue: mockCommentsRepository,
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    commentsRepository = module.get<Repository<Comments>>(
      getRepositoryToken(Comments),
    );
  });

  describe('getCommentsByServiceUser', () => {
    it('should return an array of comments for a given service user', async () => {
      // Arrange
      const userId = 1;
      const mockComments = [createMockComment(), createMockComment()];
      mockCommentsRepository.find.mockResolvedValue(mockComments);

      // Act
      const result = await commentsService.getCommentsByServiceUser(userId);

      // Assert
      expect(result).toEqual(mockComments);
      expect(mockCommentsRepository.find).toHaveBeenCalledWith({
        where: {
          to: {
            id: userId,
          },
        },
        relations: ['from', 'to'],
      });
    });
  });

  describe('addComment', () => {
    it('should add a new comment', async () => {
      // Arrange
      const comment = 'Great service!';
      const fromUserId = 1;
      const toUserId = 2;
      const mockComment = createMockComment();
      mockCommentsRepository.create.mockReturnValue(mockComment);
      mockCommentsRepository.save.mockResolvedValue(mockComment);

      // Act
      const result = await commentsService.addComment(
        comment,
        fromUserId,
        toUserId,
      );

      // Assert
      expect(result).toEqual(mockComment);
      expect(mockCommentsRepository.create).toHaveBeenCalledWith({
        comment: comment,
        from: {
          id: fromUserId,
        },
        to: {
          id: toUserId,
        },
      });
      expect(mockCommentsRepository.save).toHaveBeenCalledWith(mockComment);
    });

    it('should throw a ConflictException if "from" and "to" users are the same', async () => {
      // Arrange
      const comment = 'This is a self-comment';
      const userId = 1;

      // Act and Assert
      await expect(
        commentsService.addComment(comment, userId, userId),
      ).rejects.toThrowError(ConflictException);
    });
  });
});

// Helper function to create a mock comment
function createMockComment(): Comments {
  const mockComment = new Comments();
  mockComment.id = 1;
  mockComment.comment = 'Mock comment';
  mockComment.from = createMockUser();
  mockComment.to = createMockUser();
  return mockComment;
}

// Helper function to create a mock user
function createMockUser(): User {
  const mockUser = new User();
  mockUser.id = 1;
  // Add other properties as needed
  return mockUser;
}
