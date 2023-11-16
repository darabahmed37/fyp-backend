import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesController } from './features.controller';
import { FeaturesService } from './features.service';
import { CreateServiceDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { Public } from 'utils/custom.decorator';
import { join } from 'path';

describe('FeaturesController', () => {
  let featuresController: FeaturesController;
  let featuresService: FeaturesService;

  const mockFeaturesService = {
    createService: jest.fn(),
    getAllServices: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeaturesController],
      providers: [
        {
          provide: FeaturesService,
          useValue: mockFeaturesService,
        },
      ],
    }).compile();

    featuresController = module.get<FeaturesController>(FeaturesController);
    featuresService = module.get<FeaturesService>(FeaturesService);
  });

  describe('newService', () => {
    it('should create and return a new service', async () => {
      // Arrange
      const createServiceDTO: CreateServiceDTO = {
        title: 'Test Service',
        description: 'This is a test service.',
      };
      const mockUploadedFile = {
        filename: 'test.jpg',
      };

      // Mocking the FileInterceptor
      // @ts-ignore
      jest
        .spyOn(FileInterceptor, 'intercept')
        .mockReturnValue(() => mockUploadedFile);

      mockFeaturesService.createService.mockResolvedValue({
        ...createServiceDTO,
        image: mockUploadedFile.filename,
      });

      // Act
      // @ts-ignore
      const result = await featuresController.newService(
        {},
        mockUploadedFile,
        createServiceDTO,
      );

      // Assert
      expect(result).toEqual({
        ...createServiceDTO,
        image: mockUploadedFile.filename,
      });
      expect(mockFeaturesService.createService).toHaveBeenCalledWith({
        ...createServiceDTO,
        image: mockUploadedFile.filename,
      });
    });
  });

  describe('getAllService', () => {
    it('should return an array of services', async () => {
      // Arrange
      const mockServices = [createMockService(), createMockService()];
      mockFeaturesService.getAllServices.mockResolvedValue(mockServices);

      // Act
      const result = await featuresController.getAllService();

      // Assert
      expect(result).toEqual(mockServices);
      expect(mockFeaturesService.getAllServices).toHaveBeenCalled();
    });
  });

  describe('getImage', () => {
    it('should return an image file', () => {
      // Arrange
      const mockImageFilename = 'test.jpg';
      const mockFilePath = join(
        __dirname,
        '..',
        '..',
        'uploads',
        mockImageFilename,
      );
      const mockResponse = {
        sendFile: jest.fn(),
      } as unknown as Response;

      // Act
      featuresController.getImage(mockImageFilename, mockResponse);

      // Assert
      expect(mockResponse.sendFile).toHaveBeenCalledWith(mockFilePath);
    });
  });
});

// Helper function to create a mock service
function createMockService(): CreateServiceDTO {
  return {
    title: 'Mock Service',
    description: 'This is a mock service.',
  };
}
