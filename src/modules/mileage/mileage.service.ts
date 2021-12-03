import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Mileage as Entity } from './entities/mileage.entity';

@Injectable()
export class MileageService extends ModelService {
  constructor(@InjectModel(Entity) model: ModelType<Entity>) {
    super(model);
  }
}
