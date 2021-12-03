import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService extends ModelService {
  /**
   * searchFields
   * @property array of fields to include in search
   */
  searchFields: string[] = ['name'];

  constructor(@InjectModel(Role) model: ModelType<Role>) {
    super(model);
  }
}
