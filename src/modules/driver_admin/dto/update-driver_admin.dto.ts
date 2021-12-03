import { PartialType } from '@nestjs/swagger';
import { Driver_admin } from '../entities/driver_admin.entity';

export class UpdateDriver_adminDto extends PartialType(Driver_admin) {}
