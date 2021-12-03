import { PartialType } from '@nestjs/swagger';
import { Mileage } from '../entities/mileage.entity';

export class UpdateMileageDto extends PartialType(Mileage) {}
