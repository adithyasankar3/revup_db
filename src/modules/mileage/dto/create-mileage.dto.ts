import { OmitType } from '@nestjs/swagger';
import { Mileage } from '../entities/mileage.entity';

export class CreateMileageDto extends OmitType(Mileage, ['active'] as const) {}
