import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Add_vehicleService } from './add_vehicle.service';
import { Add_vehicleController } from './add_vehicle.controller';
import { Add_vehicle } from './entities/add_vehicle.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Add_vehicle]), MsClientModule],
  controllers: [Add_vehicleController],
  providers: [Add_vehicleService],
})
export class Add_vehicleModule {}
