import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Add_product as Entity } from './entities/add_product.entity';

@Injectable()
export class Add_productService extends ModelService {
  constructor(@InjectModel(Entity) model: ModelType<Entity>) {
    super(model);
  }
}
