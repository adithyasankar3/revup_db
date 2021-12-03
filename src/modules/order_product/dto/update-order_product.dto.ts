import { PartialType } from '@nestjs/swagger';
import { Order_product } from '../entities/order_product.entity';

export class UpdateOrder_productDto extends PartialType(Order_product) {}
