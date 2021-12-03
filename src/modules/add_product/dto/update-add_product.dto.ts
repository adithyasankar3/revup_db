import { PartialType } from '@nestjs/swagger';
import { Add_product } from '../entities/add_product.entity';

export class UpdateAdd_productDto extends PartialType(Add_product) {}
