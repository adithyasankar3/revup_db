import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Country extends Entity<Country> {
  @Column
  @Index
  @ApiProperty({
    description: 'Country name',
    example: 'United States',
  })
  @IsString()
  name: string;

  @Column
  @Index
  @ApiProperty({
    description: 'Country code',
    example: 'US',
  })
  @IsString()
  code: string;
}
