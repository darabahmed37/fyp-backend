import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Features } from 'features/features.model';
import { Repository } from 'typeorm';
import { CreateServiceDTO } from 'features/dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Features)
    private featureModel: Repository<Features>,
  ) {}

  createService(obj: CreateServiceDTO) {
    const newService = this.featureModel.create(obj);
    return this.featureModel.save(newService);
  }

  getAllServices() {

    return this.featureModel.find();
  }
}
