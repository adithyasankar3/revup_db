import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver_adminService } from './driver_admin.service';
import { Driver_adminController } from './driver_admin.controller';
import { Driver_admin } from './entities/driver_admin.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Driver_admin]), MsClientModule],
  controllers: [Driver_adminController],
  providers: [Driver_adminService],
})
export class Driver_adminModule {}
