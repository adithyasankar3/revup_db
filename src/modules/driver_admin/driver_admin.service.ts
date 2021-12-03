import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Driver_admin as Entity } from './entities/driver_admin.entity';

@Injectable()
export class Driver_adminService extends ModelService {
  constructor(@InjectModel(Entity) model: ModelType<Entity>) {
    super(model);
  }
}
