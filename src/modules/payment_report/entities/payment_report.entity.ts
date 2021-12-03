import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Payment_report extends Entity<Payment_report> {
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
    description: 'Date',
    example: '20 Oct 2021',
  })
  @IsString()
  date: string;

  @Column
  @ApiProperty({
    description: 'Transaction ID',
    example: '123456',
  })
  @IsNumber()
  transaction_id: number;

  @Column
  @ApiProperty({
    description: 'Amount',
    example: '350',
  })
  @IsNumber()
  amount: number;

  @Column
  @ApiProperty({
    description: 'Order ID',
    example: '123456',
  })
  @IsNumber()
  order_id: number;

  @Column
  @ApiProperty({
    description: 'Catagory',
    example: 'shop',
  })
  @IsString()
  catagory: string;
  
  @Column
  @ApiProperty({
    description: 'Payment status',
    example: 'Paid',
  })
  @IsString()
  payment_status: string;

  @Column
  @ApiProperty({
    description: 'Action',
    example: 'refund',
  })
  @IsString()
  action: string;
  
  @BelongsTo(() => Customer, 'customer_id')
  customer: Customer;
}
