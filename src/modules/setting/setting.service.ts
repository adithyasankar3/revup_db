import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ModelService } from '../../core/modules/database/model.service';
import { ModelType } from '../../core/modules/database/database.service';
import { Setting } from './entities/setting.entity';
import { Job, JobResponse } from '../../core/utils/job';
import { isArray } from 'class-validator';

@Injectable()
export class SettingService extends ModelService {
  /**
   * searchFields
   * @property array of fields to include in search
   */
  searchFields: string[] = ['name', '$country.name$'];

  /**
   * searchPopulate
   * @property array of associations to include for search
   */
  searchPopulate: string[] = ['country'];

  constructor(@InjectModel(Setting) model: ModelType<Setting>) {
    super(model);
  }

  /**
   * update bulk
   * @function update array of record using primary key
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} job response object
   */
  async updateBulk(job: Job): Promise<JobResponse> {
    if (!isArray(job.records) || !job.records.length) {
      return { error: 'Records missing' };
    }
    job.response.data = [];
    for (let index = 0; index < job.records.length; index++) {
      const record = job.records[index];
      const recordJob = new Job({
        owner: job.owner,
        action: 'update',
        id: record.id,
        body: record,
        options: {
          fields: ['value'],
        },
      });
      await this.doBeforeWrite(recordJob);
      if (!!recordJob.response.error) {
        return recordJob.response;
      }
      recordJob.response = await this.updateRecord(recordJob);
      await this.doAfterWrite(recordJob);
      if (!!recordJob.response.error) {
        return recordJob.response;
      }
      job.response.data.push(recordJob.response.data);
    }
    return job.response;
  }
}
