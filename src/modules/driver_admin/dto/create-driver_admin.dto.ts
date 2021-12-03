import { OmitType } from '@nestjs/swagger';
import { Driver_admin } from '../entities/driver_admin.entity';

export class CreateDriver_adminDto extends OmitType(Driver_admin, [
  'active',
] as const) {}
