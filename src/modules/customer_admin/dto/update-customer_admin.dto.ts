import { PartialType } from '@nestjs/swagger';
import { Customer_admin } from '../entities/customer_admin.entity';

export class UpdateCustomer_adminDto extends PartialType(Customer_admin) {}
