import { PartialType } from '@nestjs/swagger';
import { Coupon_code } from '../entities/coupon_code.entity';

export class UpdateCoupon_codeDto extends PartialType(Coupon_code) {}
