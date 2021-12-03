import { OmitType } from '@nestjs/swagger';
import { Bank_account } from '../entities/bank_account.entity';

export class CreateBank_accountDto extends OmitType(Bank_account, [
  'active',
] as const) {}
