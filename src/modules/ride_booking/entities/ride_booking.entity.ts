import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, HasOne, DataType, ForeignKey } from 'sequelize-typescript';
import { Ride_details } from 'src/modules/ride_details/entities/ride_details.entity';
import { Entity } from '../../../core/modules/database/entity';
import {status} from '../status.enum'

@Table
export class Ride_booking extends Entity<Ride_booking> {
  @Index
  @Column
  @ApiProperty({
    description: 'Duration',
    example: '5',
  })
  @IsNumber()
  duration: number;

  @Column
  @ApiProperty({
    description: 'Start date',
    example: '14 Oct 2021',
  })
  @IsString()
  date: string;

  @Column
  @ApiProperty({
    description: 'Time',
    example: '8:00 pm',
  })
  @IsString()
  time: string;

  @Column
  @ApiProperty({
    description: 'Pickup Location',
    example: 'Manhattan',
  })
  @IsString()
  pick_location: string;

  @Column
  @ApiProperty({
    description: 'Total',
    example: '350',
  })
  @IsNumber()
  total: number;


  @Column({
    type: DataType.ENUM(...Object.keys(status)),
    defaultValue: status.pending,
  })
  @ApiProperty({
    description: 'Status',
    example: 'Scheduled',
    default:status.pending
  })
  @IsEnum(Object.keys(status))
  status: status;

  @Column
  @ApiProperty({
    description:"Driver ID",
    example:"1"
  })
  @IsNumber()
  driver_id:number


  @Column
  @ApiProperty({
    description:"Customer ID",
    example:"1"
  })
  @IsNumber()
  customer_id:number


  @HasOne(() => Ride_details, 'ride_id')
  ride_id: Ride_details;

}
