import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, HasOne } from 'sequelize-typescript';
import { Ride_details } from 'src/modules/ride_details/entities/ride_details.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Add_vehicle extends Entity<Add_vehicle> {
  @Index
  @Column
  @ApiProperty({
    description: 'Vehicle Image',
    example: 'nissan.jpg',
  })
  @IsString()
  image: string;

  @Column
  @ApiProperty({
    description: 'Vehicle Plate Number',
    example: 'Texas 202 HEZ',
  })
  @IsString()
  plate_num: string;

  @Column
  @ApiProperty({
    description: 'Number of seats',
    example: '2',
  })
  @IsNumber()
  seats_num: number;

  @Column
  @ApiProperty({
    description: 'Luggage Space',
    example: '4',
  })
  @IsNumber()
  luggage_num: number;

  @Column
  @ApiProperty({
    description: 'Engine',
    example: 'V10',
  })
  @IsString()
  engine: string;

  @Column
  @ApiProperty({
    description: 'acceleration',
    example: '3.5 sec',
  })
  @IsString()
  acceleration: string;

  @Column
  @ApiProperty({
    description: 'Maximum Speed',
    example: '324 km/h - 200 mph',
  })
  @IsString()
  max_speed: string;

  @Column
  @ApiProperty({
    description: 'Transmission',
    example: 'Auto',
  })
  @IsString()
  transmission: string;

  @Column
  @ApiProperty({
    description: 'Fuel',
    example: 'Gasoline',
  })
  @IsString()
  fuel: string;

  @Column
  @ApiProperty({
    description: 'Options',
    example: 'Full',
  })
  @IsString()
  options: string;

  @Column
  @ApiProperty({
    description: 'Description',
    example: 'A good car',
  })
  @IsString()
  description: string;

  @HasOne(() => Ride_details, 'vehicle_id')
  vehicle_in_ride_details: Ride_details;
  
}
