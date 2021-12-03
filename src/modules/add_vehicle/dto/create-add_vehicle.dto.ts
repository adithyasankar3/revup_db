import { OmitType } from '@nestjs/swagger';
import { Add_vehicle } from '../entities/add_vehicle.entity';

export class CreateAdd_vehicleDto extends OmitType(Add_vehicle, [
  'active',
] as const) {}
