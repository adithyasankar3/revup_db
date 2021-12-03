import { PartialType } from '@nestjs/swagger';
import { Ride_details } from '../entities/ride_details.entity';

export class UpdateRide_detailsDto extends PartialType(Ride_details) {}
