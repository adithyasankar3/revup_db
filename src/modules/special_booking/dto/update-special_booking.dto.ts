import { PartialType } from '@nestjs/swagger';
import { Special_booking } from '../entities/special_booking.entity';

export class UpdateSpecial_bookingDto extends PartialType(Special_booking) {}
