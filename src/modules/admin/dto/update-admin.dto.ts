import { PartialType } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entity';

export class UpdateAdminDto extends PartialType(Admin) {}
