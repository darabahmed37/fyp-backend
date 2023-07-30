import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeaturesModel } from 'features/features.model';
import { Repository } from 'typeorm';
import { CreateServiceDTO } from 'features/dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(FeaturesModel)
    private featureModel: Repository<FeaturesModel>,
  ) {}

  createService(obj: CreateServiceDTO) {
    const newService = this.featureModel.create(obj);
    return this.featureModel.save(newService);
  }

  getAllServices() {
    return this.featureModel.find();
  }
}
