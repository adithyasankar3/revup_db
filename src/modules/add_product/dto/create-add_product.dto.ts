import { OmitType } from '@nestjs/swagger';
import { Add_product } from '../entities/add_product.entity';

export class CreateAdd_productDto extends OmitType(Add_product, [
  'active','status',
] as const) {}
