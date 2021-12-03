import { OmitType } from '@nestjs/swagger';
import { Payment_report } from '../entities/payment_report.entity';

export class CreatePayment_reportDto extends OmitType(Payment_report, [
  'active',
] as const) {}
