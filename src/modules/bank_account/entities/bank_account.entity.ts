import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Bank_account extends Entity<Bank_account> {
  @Index
  @Column
  @ApiProperty({
    description: 'Holder Name',
    example: 'Philip',
  })
  @IsString()
  name: string;

  @Column
  @ApiProperty({
    description: 'Routing number',
    example: '999999999999',
  })
  @IsNumber()
  routing_num: number;

  @Column
  @ApiProperty({
    description: 'Account Number',
    example: '888888888888',
  })
  @IsNumber()
  account_num: number;

  @Column
  @ApiProperty({
    description: 'Address',
    example: '320 compton Los angeles',
  })
  @IsString()
  address: string;

  @Column
  @ApiProperty({
    description: 'City',
    example: 'New york',
  })
  @IsString()
  city: string;

  @Column
  @ApiProperty({
    description: 'Zip',
    example: '788787',
  })
  @IsNumber()
  zip: number;
}
