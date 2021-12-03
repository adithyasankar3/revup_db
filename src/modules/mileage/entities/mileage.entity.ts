import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Add_driver } from 'src/modules/add_driver/entities/add_driver.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Mileage extends Entity<Mileage> {
  @Index
  @ForeignKey(() => Add_driver)
  @Column
  @ApiProperty({
    description: 'Driver ID',
    example: 1,
  })
  @IsInt()
  driver_id: number;

  @Column
  @ApiProperty({
    description: 'Starting Mileage',
    example: '2000',
  })
  @IsNumber()
  start: number;

  @Column
  @ApiProperty({
    description: 'Starting Time',
    example: '08:00 am',
  })
  @IsString()
  start_time: string;
  
  @Column
  @ApiProperty({
    description: 'Ending Mileage',
    example: '2500',
  })
  @IsNumber()
  end: number;

  @Column
  @ApiProperty({
    description: 'Ending Time',
    example: '9:00 am',
  })
  @IsString()
  end_time: string;

  @Column
  @ApiProperty({
    description: 'Date',
    example: '21 Oct 2020',
  })
  @IsString()
  date: string;

  @Column
  @ApiProperty({
    description: 'Total travelled miles',
    example: '500',
  })
  @IsNumber()
  travelled_miles: number;

  @BelongsTo(() => Add_driver, 'driver_id')
  driver:Add_driver;

}
