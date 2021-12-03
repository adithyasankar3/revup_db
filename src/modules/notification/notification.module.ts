import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';
import { TemplateModule } from '../template/template.module';
import { UserModule } from '../user/user.module';
import { LoginLogModule } from '../login-log/login-log.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MsClientModule,
    TemplateModule,
    UserModule,
    LoginLogModule,
    ConfigModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
