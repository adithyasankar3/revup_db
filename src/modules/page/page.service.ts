import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Page } from './entities/page.entity';
import { Job } from '../../core/utils/job';

@Injectable()
export class PageService extends ModelService {
  /**
   * searchFields
   * @property array of fields to include in search
   */
  searchFields: string[] = ['name', 'title'];

  constructor(@InjectModel(Page) model: ModelType<Page>) {
    super(model);
  }

  /**
   * doBeforeWrite
   * @function function will execute before create and update function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {void}
   */
  async doBeforeWrite(job: Job): Promise<void> {
    await super.doBeforeWrite(job);
    if (job.action === 'update') {
      delete job.body?.name;
      delete job.body?.allow_html;
    }
  }
}
