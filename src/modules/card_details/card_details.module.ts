import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card_detailsService } from './card_details.service';
import { Card_detailsController } from './card_details.controller';
import { Card_details } from './entities/card_details.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Card_details]), MsClientModule],
  controllers: [Card_detailsController],
  providers: [Card_detailsService],
})
export class Card_detailsModule {}
