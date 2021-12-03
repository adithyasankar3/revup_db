import { OmitType } from '@nestjs/swagger';
import { Ride_booking } from '../entities/ride_booking.entity';

export class CreateRide_bookingDto extends OmitType(Ride_booking, [
  'active','status'
] as const) {}
