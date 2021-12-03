import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpSession, OtpSessionSchema } from './entities/otp-session.schema';
import { OtpSessionService } from './otp-session.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OtpSession.name, schema: OtpSessionSchema },
    ]),
  ],
  providers: [OtpSessionService],
  exports: [OtpSessionService],
})
export class OtpSessionModule {}
