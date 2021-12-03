import { OmitType } from '@nestjs/swagger';
import { Coupon_code } from '../entities/coupon_code.entity';

export class CreateCoupon_codeDto extends OmitType(Coupon_code, [
  'active','status',
] as const) {}
