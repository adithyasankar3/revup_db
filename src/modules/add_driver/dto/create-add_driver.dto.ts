import { OmitType } from '@nestjs/swagger';
import { Add_driver } from '../entities/add_driver.entity';

export class CreateAdd_driverDto extends OmitType(Add_driver, [
  'active',
] as const) {}
