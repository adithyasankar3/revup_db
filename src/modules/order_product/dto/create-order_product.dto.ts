import { OmitType } from '@nestjs/swagger';
import { Order_product } from '../entities/order_product.entity';

export class CreateOrder_productDto extends OmitType(Order_product, [
  'active',
] as const) {}
