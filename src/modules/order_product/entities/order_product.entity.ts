import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, HasOne } from 'sequelize-typescript';
import { Product_orders } from 'src/modules/product_orders/entities/product_orders.entity';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Order_product extends Entity<Order_product> {
  @Index
  @Column
  @ApiProperty({
    description: 'Price',
    example: '5000',
  })
  @IsNumber()
  price: number;

  @Column
  @ApiProperty({
    description: 'Quantity',
    example: '2',
  })
  @IsNumber()
  quantity: number;

  @Column
  @ApiProperty({
    description: 'Date',
    example: '21 Oct 2021',
  })
  @IsString()
  date: string;

  @Column
  @ApiProperty({
    description: 'Time',
    example: '12:00 pm',
  })
  @IsString()
  time: string;

  @HasOne(() => Product_orders, 'order_id')
  product_in_product_orders: Product_orders;
}
