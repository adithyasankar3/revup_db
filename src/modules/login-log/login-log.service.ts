import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../../core/modules/mongo/model.service';
import { Job } from '../../core/utils/job';
import { LoginLog, LoginLogDocument } from './entities/login-log.schema';

@Injectable()
export class LoginLogService extends ModelService {
  constructor(@InjectModel(LoginLog.name) model: Model<LoginLogDocument>) {
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
    if (job.action === 'create') {
      if (!!job.body.info?.device_token) {
        await this.updateBulkRecords(
          new Job({
            owner: job.owner,
            body: {
              active: false,
            },
            options: {
              where: {
                active: true,
                'info.device_token': job.body.info.device_token,
              },
            },
          }),
        );
      }
    }
  }
}
