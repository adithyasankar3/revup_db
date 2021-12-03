import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MileageService } from './mileage.service';
import { MileageController } from './mileage.controller';
import { Mileage } from './entities/mileage.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Mileage]), MsClientModule],
  controllers: [MileageController],
  providers: [MileageService],
})
export class MileageModule {}
