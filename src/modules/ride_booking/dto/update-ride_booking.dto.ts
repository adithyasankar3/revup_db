import { PartialType } from '@nestjs/swagger';
import { Ride_booking } from '../entities/ride_booking.entity';

export class UpdateRide_bookingDto extends PartialType(Ride_booking) {}
