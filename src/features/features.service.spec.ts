import { Test, TestingModule } from '@nestjs/testing';
import { FeaturesService } from './features.service';
import { Repository } from 'typeorm';
import { Features } from './features.model';
import { CreateServiceDTO } from './dto';
import {getRepositoryToken} from "@nestjs/typeorm";

describe('FeaturesService', () => {
  let featuresService: FeaturesService;
  let featureModel: Repository<Features>;

  const mockFeatureRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeaturesService,
        {
          provide: getRepositoryToken(Features),
          useValue: mockFeatureRepository,
        },
      ],
    }).compile();

    featuresService = module.get<FeaturesService>(FeaturesService);
    featureModel = module.get<Repository<Features>>(getRepositoryToken(Features));
  });

  describe('createService', () => {
    it('should create and return a new service', async () => {
      // Arrange
      const createServiceDTO: CreateServiceDTO = {
        image: 'test.jpg',
        title: 'Test Service',
        description: 'This is a test service.',
      };
      const mockService = new Features();
      mockFeatureRepository.create.mockReturnValue(mockService);
      mockFeatureRepository.save.mockResolvedValue(mockService);

      // Act
      const result = await featuresService.createService(createServiceDTO);

      // Assert
      expect(result).toEqual(mockService);
      expect(mockFeatureRepository.create).toHaveBeenCalledWith(createServiceDTO);
      expect(mockFeatureRepository.save).toHaveBeenCalledWith(mockService);
    });
  });

  describe('getAllServices', () => {
    it('should return an array of services', async () => {
      // Arrange
      const mockServices = [new Features(), new Features()];
      mockFeatureRepository.find.mockResolvedValue(mockServices);

      // Act
      const result = await featuresService.getAllServices();

      // Assert
      expect(result).toEqual(mockServices);
      expect(mockFeatureRepository.find).toHaveBeenCalled();
    });
  });
});
