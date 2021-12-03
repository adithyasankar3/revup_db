import { PartialType } from '@nestjs/swagger';
import { Product_orders } from '../entities/product_orders.entity';

export class UpdateProduct_ordersDto extends PartialType(Product_orders) {}
