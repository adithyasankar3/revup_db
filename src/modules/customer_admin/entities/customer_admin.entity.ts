import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { status } from 'src/modules/add_product/status.enum';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Customer_admin extends Entity<Customer_admin> {
  @Index
  @ForeignKey(() => Customer)
  @Column
  @ApiProperty({
    description: 'Customer ID',
    example: 1,
  })
  @IsInt()
  customer_id: number;

  @Column
  @ApiProperty({
    description: 'Date of join',
    example: '20 Oct 2021',
  })
  @IsString()
  join_date: string;

  @Column
  @ApiProperty({
    description: 'Total Rides',
    example: '5',
  })
  @IsNumber()
  Total_rides: number;

  @Column
  @ApiProperty({
    description: 'Products Purchased',
    example: '2',
  })
  @IsNumber()
  products_purch: number;

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

  @BelongsTo(()=>Customer, 'customer_id')
  customer: Customer;

}
