import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Address as Entity } from './entities/address.entity';

@Injectable()
export class AddressService extends ModelService {
  constructor(@InjectModel(Entity) model: ModelType<Entity>) {
    super(model);
  }
}
