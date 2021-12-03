import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ride_bookingService } from './ride_booking.service';
import { Ride_bookingController } from './ride_booking.controller';
import { Ride_booking } from './entities/ride_booking.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Ride_booking]), MsClientModule],
  controllers: [Ride_bookingController],
  providers: [Ride_bookingService],
})
export class Ride_bookingModule {}
