import { PartialType } from '@nestjs/swagger';
import { Add_vehicle } from '../entities/add_vehicle.entity';

export class UpdateAdd_vehicleDto extends PartialType(Add_vehicle) {}
