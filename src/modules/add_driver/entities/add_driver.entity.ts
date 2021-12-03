import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, HasOne } from 'sequelize-typescript';
import { Mileage } from 'src/modules/mileage/entities/mileage.entity';
import { Ride_details } from 'src/modules/ride_details/entities/ride_details.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Add_driver extends Entity<Add_driver> {
  @Index
  @Column
  @ApiProperty({
    description: 'Image',
    example: 'tom.jpg',
  })
  @IsString()
  image: string;

  @Column
  @ApiProperty({
    description: 'First Name',
    example: 'Tom',
  })
  @IsString()
  first_name: string;

  @Column
  @ApiProperty({
    description: 'Last Name',
    example: 'Ford',
  })
  @IsString()
  last_name: string;

  @Column
  @ApiProperty({
    description: 'Email',
    example: 'tom@gmail.com',
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
    description: 'Password',
    example: 'tom@1234',
  })
  @IsString()
  password: string;

  @Column
  @ApiProperty({
    description: 'Driving License',
    example: 'license.jpg',
  })
  @IsString()
  license: string;

  @Column
  @ApiProperty({
    description: 'Insurance',
    example: 'insurance.jpg',
  })
  @IsString()
  insurance: string;

  @HasOne(() => Mileage, 'driver_id')
  driver_in_mileage: Mileage;

  @HasOne(() => Ride_details, 'driver_id')
  driver_in_ride_details: Ride_details;
  
}
