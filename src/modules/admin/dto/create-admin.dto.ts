import { OmitType } from '@nestjs/swagger';
import { Admin } from '../entities/admin.entity';

export class CreateAdminDto extends OmitType(Admin, ['active'] as const) {}
