import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import { status } from '../status.enum'

@Table
export class Special_booking extends Entity<Special_booking> {
  @Index
  @Column
  @ApiProperty({
    description: 'First Name',
    example: 'Tony',
  })
  @IsString()
  first_name: string;

  @Column
  @ApiProperty({
    description: 'Last Name',
    example: 'tom',
  })
  @IsString()
  last_name: string;

  @Column
  @ApiProperty({
    description: 'Email',
    example: 'tony@gmail.com',
  })
  @IsString()
  email: string;

  @Column
  @ApiProperty({
    description: 'Phone',
    example: '9999999999',
  })
  @IsNumber()
  phone: number;

  @Column
  @ApiProperty({
    description: 'Vehicle',
    example: 'Lamborgini',
  })
  @IsString()
  vehicle: string;

  @Column
  @ApiProperty({
    description: 'Duration',
    example: '4',
  })
  @IsNumber()
  duration: number;

  @Column
  @ApiProperty({
    description: 'Date',
    example: 'Oct 20 saturday',
  })
  @IsString()
  date: string;

  @Column
  @ApiProperty({
    description: 'Time',
    example: '9:00 pm',
  })
  @IsString()
  time: string;

  @Column
  @ApiProperty({
    description: 'Service Location',
    example: 'Manhattan',
  })
  @IsString()
  location: string;

  @Column
  @ApiProperty({
    description: 'Ride cost',
    example: '350',
  })
  @IsNumber()
  ride_rate: number;

  @Column
  @ApiProperty({
    description: 'Driver',
    example: 'Mack',
  })
  @IsString()
  driver: string;

  @Column({
    type: DataType.ENUM(...Object.keys(status)),
    defaultValue: status.pending,
  })
  @ApiProperty({
    description: 'Status',
    example: 'Pending',
    default:status.pending
  })
  @IsEnum(Object.keys(status))
  status:status



}
