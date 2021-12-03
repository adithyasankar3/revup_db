import { PartialType } from '@nestjs/swagger';
import { Add_driver } from '../entities/add_driver.entity';

export class UpdateAdd_driverDto extends PartialType(Add_driver) {}
