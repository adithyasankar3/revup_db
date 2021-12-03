import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Ride_booking } from 'src/modules/ride_booking/entities/ride_booking.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Driver_admin extends Entity<Driver_admin> {
  @Index
  @ForeignKey(() => Customer)
  @Column
  @ApiProperty({
    description: 'Customer ID',
    example: 1,
  })
  @IsInt()
  customer_id: number;

  @ForeignKey(() =>Ride_booking)
  @Column
  @ApiProperty({
    description: 'Ride ID',
    example: 1,
  })
  @IsInt()
  ride_id: number;

  @Column
  @ApiProperty({
    description: 'Tips',
    example: '100',
  })
  @IsString()
  tips: string;

  @Column
  @ApiProperty({
    description: 'Rating',
    example: '5',
  })
  @IsNumber()
  rating: number;

  @BelongsTo(() => Customer, 'customer_id')
  customer: Customer;

  @BelongsTo(() => Ride_booking, 'ride_id')
  ride: Ride_booking;


}
