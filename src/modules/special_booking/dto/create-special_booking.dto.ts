import { OmitType } from '@nestjs/swagger';
import { Special_booking } from '../entities/special_booking.entity';

export class CreateSpecial_bookingDto extends OmitType(Special_booking, [
  'active','status',
] as const) {}
