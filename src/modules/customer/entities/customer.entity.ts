import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, HasOne } from 'sequelize-typescript';
import { Customer_admin } from 'src/modules/customer_admin/entities/customer_admin.entity';
import { Driver_admin } from 'src/modules/driver_admin/entities/driver_admin.entity';
import { Payment_report } from 'src/modules/payment_report/entities/payment_report.entity';
import { Product_orders } from 'src/modules/product_orders/entities/product_orders.entity';
import { Ride_details } from 'src/modules/ride_details/entities/ride_details.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Customer extends Entity<Customer> {
  @Index
  @Column
  @ApiProperty({
    description: 'First Name',
    example: 'Jack',
  })
  @IsString()
  first_name: string;

  @Column
  @ApiProperty({
    description: 'Last Name',
    example: 'Miller',
  })
  @IsString()
  last_name: string;

  @Column
  @ApiProperty({
    description: 'Phone number',
    example: '9999999999',
  })
  @IsNumber()
  phone_number: number;

  @Column
  @ApiProperty({
    description: 'Email',
    example: 'jack@gmail.com',
  })
  @IsString()
  email: string;

  @Column
  @ApiProperty({
    description: 'Password',
    example: 'jack#@9911',
  })
  @IsString()
  password: string;

  @HasOne(() => Ride_details, 'customer_id')
  customer_in_ride_details: Ride_details;

  @HasOne(() => Product_orders, 'customer_id')
  customer_in_product_orders: Product_orders;

  @HasOne(() => Payment_report, 'customer_id')
  customer_id: Payment_report;

  @HasOne(() => Customer_admin, 'customer_id')
  customerid: Customer_admin;

  @HasOne(() => Driver_admin, 'customer_id')
  customer_id_driver: Driver_admin;
}


