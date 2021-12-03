import { OmitType } from '@nestjs/swagger';
import { Product_orders } from '../entities/product_orders.entity';

export class CreateProduct_ordersDto extends OmitType(Product_orders, [
  'active','status',
] as const) {}
