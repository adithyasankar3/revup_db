import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelService } from '../../core/modules/mongo/model.service';
import { OtpSession, OtpSessionDocument } from './entities/otp-session.schema';

@Injectable()
export class OtpSessionService extends ModelService {
  constructor(@InjectModel(OtpSession.name) model: Model<OtpSessionDocument>) {
    super(model);
  }
}
