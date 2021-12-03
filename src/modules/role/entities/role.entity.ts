import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Table, Column } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Role extends Entity<Role> {
  @Column
  @ApiProperty({
    description: 'Role Name',
    example: 'Admin',
  })
  @IsString()
  name: string;
}
