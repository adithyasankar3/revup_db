import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(
  OmitType(User, ['role_id', 'password'] as const),
) {}
