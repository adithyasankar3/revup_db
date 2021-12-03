import { PartialType } from '@nestjs/swagger';
import { Payment_report } from '../entities/payment_report.entity';

export class UpdatePayment_reportDto extends PartialType(Payment_report) {}
