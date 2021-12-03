import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { Setting } from './entities/setting.entity';

@Module({
  imports: [SequelizeModule.forFeature([Setting])],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
