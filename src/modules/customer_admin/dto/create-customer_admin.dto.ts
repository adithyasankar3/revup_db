import { OmitType } from '@nestjs/swagger';
import { Customer_admin } from '../entities/customer_admin.entity';

export class CreateCustomer_adminDto extends OmitType(Customer_admin, [
  'active','status',
] as const) {}
