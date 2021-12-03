import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product_ordersService } from './product_orders.service';
import { Product_ordersController } from './product_orders.controller';
import { Product_orders } from './entities/product_orders.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Product_orders]), MsClientModule],
  controllers: [Product_ordersController],
  providers: [Product_ordersService],
})
export class Product_ordersModule {}
