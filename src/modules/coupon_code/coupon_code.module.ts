import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coupon_codeService } from './coupon_code.service';
import { Coupon_codeController } from './coupon_code.controller';
import { Coupon_code } from './entities/coupon_code.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Coupon_code]), MsClientModule],
  controllers: [Coupon_codeController],
  providers: [Coupon_codeService],
})
export class Coupon_codeModule {}
