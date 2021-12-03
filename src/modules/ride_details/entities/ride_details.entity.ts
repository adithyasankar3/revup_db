import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Add_driver } from 'src/modules/add_driver/entities/add_driver.entity';
import { Add_vehicle } from 'src/modules/add_vehicle/entities/add_vehicle.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Ride_booking } from 'src/modules/ride_booking/entities/ride_booking.entity';
import { Entity } from '../../../core/modules/database/entity';
import {status} from '../status.enum'

@Table
export class Ride_details extends Entity<Ride_details> {
  @Index
  @ForeignKey(()=>Add_vehicle)
  @Column
  @ApiProperty({
    description:'vehicle ID',
    example:'1'
  })
  @IsInt()
  vehicle_id:number;

  @ForeignKey(()=>Customer)
  @Column
  @ApiProperty({
    description:'customer ID',
    example:'1'
  })
  @IsInt()
  customer_id:number;

  @ForeignKey(()=>Add_driver)
  @Column
  @ApiProperty({
    description:'driver ID',
    example:'1'
  })
  @IsInt()
  driver_id:number;

  @ForeignKey(()=>Ride_booking)
  @Column
  @ApiProperty({
    description:'Ride ID',
    example:'1'
  })
  @IsInt()
  ride_id:number;


  @Column({
    type: DataType.ENUM(...Object.keys(status)),
    defaultValue: status.scheduled,
  })
  @ApiProperty({
    description: 'Status',
    example: 'Scheduled',
    default:status.scheduled
  })
  @IsEnum(Object.keys(status))
  status: status;

  @BelongsTo(()=>Add_vehicle,'vehicle_id')
  vehicle:Add_vehicle;
  
  @BelongsTo(()=>Customer,'customer_id')
  customer:Customer;

  @BelongsTo(()=>Add_driver,'driver_id')
  driver:Add_driver;

  @BelongsTo(()=>Ride_booking,'ride_id')
  ride:Ride_booking;

}
