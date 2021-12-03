import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Add_productService } from './add_product.service';
import { Add_productController } from './add_product.controller';
import { Add_product } from './entities/add_product.entity';
import { MsClientModule } from '../../core/modules/ms-client/ms-client.module';

@Module({
  imports: [SequelizeModule.forFeature([Add_product]), MsClientModule],
  controllers: [Add_productController],
  providers: [Add_productService],
})
export class Add_productModule {}
