import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment_reportService } from './payment_report.service';
import { Payment_reportController } from './payment_report.controller';
import { Payment_report } from './entities/payment_report.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment_report]), MsClientModule],
  controllers: [Payment_reportController],
  providers: [Payment_reportService],
})
export class Payment_reportModule {}
