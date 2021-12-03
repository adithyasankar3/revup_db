import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ride_detailsService } from './ride_details.service';
import { Ride_detailsController } from './ride_details.controller';
import { Ride_details } from './entities/ride_details.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Ride_details]), MsClientModule],
  controllers: [Ride_detailsController],
  providers: [Ride_detailsService],
})
export class Ride_detailsModule {}
