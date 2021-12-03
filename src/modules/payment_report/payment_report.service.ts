import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Payment_report as Entity } from './entities/payment_report.entity';

@Injectable()
export class Payment_reportService extends ModelService {
  constructor(@InjectModel(Entity) model: ModelType<Entity>) {
    super(model);
  }
}
