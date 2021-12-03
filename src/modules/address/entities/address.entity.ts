import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Address extends Entity<Address> {
  @Index
  @Column
  @ApiProperty({
    description: 'Name',
    example: 'Eva Tom',
  })
  @IsString()
  name: string;

  @Column
  @ApiProperty({
    description: 'Address',
    example: '280 Bed-stuy',
  })
  @IsString()
  address: string;

  @Column
  @ApiProperty({
    description: 'Unit/Floor',
    example: '4th/Floor',
  })
  @IsString()
  floor: string;

  @Column
  @ApiProperty({
    description: 'State',
    example: 'New York',
  })
  @IsString()
  state: string;

  @Column
  @ApiProperty({
    description: 'Zip Code',
    example: '10700',
  })
  @IsNumber()
  zip: number;
}
