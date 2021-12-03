import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../../utils/job';
import { JobLog, JobLogDocument } from '../mongo/schemas/job-log.schema';

@Injectable()
export class MsClientService {
  constructor(
    @Inject('WORKER_SERVICE') private readonly client: ClientProxy,
    @InjectModel(JobLog.name) private jobLogModel: Model<JobLogDocument>,
  ) {}

  async executeJob(queue: string, job: Job, logging = true): Promise<any> {
    try {
      job = JSON.parse(JSON.stringify(job));
      if (!!logging) {
        const jobLog = new this.jobLogModel({ ...job, queue });
        await jobLog.save();
        job.uid = jobLog._id;
        this.client.emit(queue, job);
        return { data: jobLog };
      } else {
        this.client.emit(queue, job);
        return { data: job };
      }
    } catch (error) {
      return { error };
    }
  }

  async jobDone(job: Job): Promise<any> {
    try {
      job.status = !!job.response.error ? 'Errored' : 'Completed';
      if (job.uid) {
        await this.jobLogModel.findByIdAndUpdate(job.uid, {
          status: job.status,
          response: JSON.parse(JSON.stringify(job.response)),
        });
      }
    } catch (error) {}
  }
}
