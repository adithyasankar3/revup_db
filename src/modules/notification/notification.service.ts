import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { handlebars } from 'hbs';
import { MsClientService } from '../../core/modules/ms-client/ms-client.service';
import { Job, JobResponse } from '../../core/utils/job';
import { LoginLogService } from '../login-log/login-log.service';
import { TemplateService } from '../template/template.service';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationService {
  private emailTemplate: HandlebarsTemplateDelegate;

  constructor(
    private userService: UserService,
    private templateService: TemplateService,
    private loginLogService: LoginLogService,
    private msClient: MsClientService,
    private config: ConfigService,
  ) {
    try {
      const template = readFileSync(
        join(__dirname, '../..', 'views/template.hbs'),
        'utf8',
      );
      this.emailTemplate = handlebars.compile(template);
    } catch (error) {
      this.emailTemplate = handlebars.compile('<div>{{{content}}</div>');
    }
  }
  /**
   * send
   * @function function send notification
   * @param {object} job - mandatory - a job object representing the job information
   * @return {JobResponse}
   */
  async send(job: Job): Promise<JobResponse> {
    const payload = job.payload;
    const getTemplate = await this.templateService.findOneRecord(
      new Job({
        options: {
          where: {
            name: payload.template,
          },
        },
      }),
    );

    if (!!getTemplate.error) {
      job.done({ error: 'Template not exist' });
      return job.response;
    }

    const template = getTemplate.data,
      variables = payload.variables || {};

    let email_subject = template.email_subject || '',
      email_body = template.email_body || '',
      sms_body = template.sms_body || '',
      users = payload.users || [];

    for (const key in variables) {
      if (Object.prototype.hasOwnProperty.call(variables, key)) {
        email_subject = email_subject.split(`##${key}##`).join(variables[key]);
        email_body = email_body.split(`##${key}##`).join(variables[key]);
        sms_body = sms_body.split(`##${key}##`).join(variables[key]);
      }
    }

    if (!!payload.user_id) {
      const getUser = await this.userService.findRecordById(
        new Job({
          id: payload.user_id,
          options: {
            attributes: [
              'id',
              'full_name',
              'email',
              'phone',
              'phone_code',
              'send_email',
              'send_sms',
            ],
          },
        }),
      );

      if (!!getUser.error) {
        job.done({ error: 'User not exist' });
        return job.response;
      }

      users.push(getUser.data);
    }

    if (!!payload.user_where) {
      const getUsers = await this.userService.getAllRecords(
        new Job({
          options: {
            limit: -1,
            where: payload.user_where,
            attributes: [
              'id',
              'full_name',
              'email',
              'phone',
              'phone_code',
              'send_email',
              'send_sms',
            ],
          },
        }),
      );

      if (!!getUsers.error) {
        job.done({ error: 'Unable to get users list' });
        return job.response;
      }

      users = [...users, ...getUsers.data];
    }

    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      const _email_subject = email_subject
        .split(`##TO_NAME##`)
        .join(user.full_name)
        .split(`##TO_EMAIL##`)
        .join(user.email);
      const _email_body = email_body
        .split(`##TO_NAME##`)
        .join(user.full_name)
        .split(`##TO_EMAIL##`)
        .join(user.email);
      const _sms_body = sms_body
        .split(`##TO_NAME##`)
        .join(user.full_name)
        .split(`##TO_EMAIL##`)
        .join(user.email);
      const _email_template = this.emailTemplate({
        content: _email_body,
        logo: this.config.get('cdnLocalURL') + 'assets/logo.png',
      });

      if (
        !!template.send_email &&
        (!!payload.skipUserConfig || !!user.send_email)
      ) {
        await this.msClient.executeJob(
          'controller.send-grid',
          new Job({
            action: 'sendMail',
            payload: {
              to: { name: user.full_name, email: user.email },
              subject: _email_subject,
              html: _email_template,
            },
          }),
        );
      }

      if (
        !!template.send_sms &&
        (!!payload.skipUserConfig || !!user.send_sms)
      ) {
        await this.msClient.executeJob(
          'controller.twilio',
          new Job({
            action: 'sendSMS',
            payload: {
              to: `${user.phone_code}${user.phone}`,
              body: _sms_body,
            },
          }),
        );
      }
    }

    job.done({ error: false });
    return job.response;
  }

  /**
   * send push
   * @function function send push notification
   * @param {object} job - mandatory - a job object representing the job information
   * @return {JobResponse}
   */
  async sendPush(job: Job): Promise<JobResponse> {
    const payload = job.payload;
    const userWhere = payload.user_where || { id: payload.user_id };
    const getUsers = await this.userService.getAllRecords(
      new Job({
        options: {
          limit: -1,
          where: { ...userWhere, send_push: true },
          attributes: ['id'],
        },
      }),
    );

    if (!!getUsers.error) {
      job.done({ error: 'Unable to get users list' });
      return job.response;
    }

    const users = JSON.parse(JSON.stringify(getUsers.data));
    const userIds = users.map((x) => x.id);

    const getSessions = await this.loginLogService.getAllRecords(
      new Job({
        options: {
          limit: -1,
          where: { user_id: { $in: userIds }, active: true },
          attributes: 'info.device_token',
        },
      }),
    );

    if (!!getSessions.error) {
      job.done({ error: 'Unable to get user tokens' });
      return job.response;
    }

    const sessions = JSON.parse(JSON.stringify(getSessions.data));
    const tokens = sessions
      .filter((x) => x.info && x.info.device_token)
      .map((x) => x.info.device_token);

    await this.msClient.executeJob(
      'controller.firebase-notification',
      new Job({
        action: 'sendMulticast',
        payload: {
          data: payload.data,
          notification: payload.notification,
          tokens,
        },
      }),
    );

    job.done({ error: false });
    return job.response;
  }
}
