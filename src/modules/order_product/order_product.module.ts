import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order_productService } from './order_product.service';
import { Order_productController } from './order_product.controller';
import { Order_product } from './entities/order_product.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Order_product]), MsClientModule],
  controllers: [Order_productController],
  providers: [Order_productService],
})
export class Order_productModule {}
