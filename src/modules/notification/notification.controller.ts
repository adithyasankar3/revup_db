import { Controller } from '@nestjs/common';
import { Job, JobResponse } from '../../core/utils/job';
import { NotificationService } from './notification.service';
import { MsClientService } from '../../core/modules/ms-client/ms-client.service';
import { MsListener } from '../../core/utils/decorators';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Notification
   */
  @MsListener('controller.notification')
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.notificationService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
}
