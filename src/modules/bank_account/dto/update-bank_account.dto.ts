import { PartialType } from '@nestjs/swagger';
import { Bank_account } from '../entities/bank_account.entity';

export class UpdateBank_accountDto extends PartialType(Bank_account) {}
