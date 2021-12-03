import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import {status} from '../status.enum'

@Table
export class Coupon_code extends Entity<Coupon_code> {
  @Index
  @Column
  @ApiProperty({
    description: 'Code',
    example: 'WEL20',
  })
  @IsString()
  code: string;

  @Column
  @ApiProperty({
    description: 'Catagory',
    example: 'ride',
  })
  @IsString()
  catagory: string;

  @Column
  @ApiProperty({
    description: 'Offer',
    example: 'pride discount - 20%',
  })
  @IsString()
  offer: string;

  @Column
  @ApiProperty({
    description: 'Active date',
    example: '21 Oct 2020',
  })
  @IsString()
  active_date: string;

  @Column
  @ApiProperty({
    description: 'Active time',
    example: '10:00 am',
  })
  @IsString()
  active_time: string;

  @Column
  @ApiProperty({
    description: 'Expire date',
    example: '22 Oct 2021',
  })
  @IsString()
  expire_date: string;

  @Column
  @ApiProperty({
    description: 'Expire time',
    example: '10:00 am',
  })
  @IsString()
  expire_time: string;

  @Column
  @ApiProperty({
    description: 'Applied',
    example: '250',
  })
  @IsNumber()
  applied: number;

  @Column
  @ApiProperty({
    description: 'Created date',
    example: '20 Oct 2021',
  })
  @IsString()
  created_date: string;

  @Column
  @ApiProperty({
    description: 'Created time',
    example: '10:00 pm',
  })
  @IsString()
  created_time: string;

  @Column({
    type: DataType.ENUM(...Object.keys(status)),
    defaultValue: status.active,
  })
  @ApiProperty({
    description: 'Status',
    example: 'Active',
    default:status.active
  })
  @IsEnum(Object.keys(status))
  status: status;


}
