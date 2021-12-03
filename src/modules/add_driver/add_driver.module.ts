import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Add_driverService } from './add_driver.service';
import { Add_driverController } from './add_driver.controller';
import { Add_driver } from './entities/add_driver.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Add_driver]), MsClientModule],
  controllers: [Add_driverController],
  providers: [Add_driverService],
})
export class Add_driverModule {}
