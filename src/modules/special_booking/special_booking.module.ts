import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Special_bookingService } from './special_booking.service';
import { Special_bookingController } from './special_booking.controller';
import { Special_booking } from './entities/special_booking.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Special_booking]), MsClientModule],
  controllers: [Special_bookingController],
  providers: [Special_bookingService],
})
export class Special_bookingModule {}
