import { PartialType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class UpdateCustomerDto extends PartialType(Customer) {}
