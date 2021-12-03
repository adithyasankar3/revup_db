import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Address]), MsClientModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
