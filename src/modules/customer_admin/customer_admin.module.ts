import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer_adminService } from './customer_admin.service';
import { Customer_adminController } from './customer_admin.controller';
import { Customer_admin } from './entities/customer_admin.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Customer_admin]), MsClientModule],
  controllers: [Customer_adminController],
  providers: [Customer_adminService],
})
export class Customer_adminModule {}
