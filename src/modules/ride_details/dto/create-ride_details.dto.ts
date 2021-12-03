import { OmitType } from '@nestjs/swagger';
import { Ride_details } from '../entities/ride_details.entity';

export class CreateRide_detailsDto extends OmitType(Ride_details, [
  'active','status',
] as const) {}
