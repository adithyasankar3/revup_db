import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Add_product } from 'src/modules/add_product/entities/add_product.entity';
import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Order_product } from 'src/modules/order_product/entities/order_product.entity';
import { Entity } from '../../../core/modules/database/entity';
import { status } from '../status.enum';

@Table
export class Product_orders extends Entity<Product_orders> {
  @Index
  @ForeignKey(()=>Add_product)
  @Column
  @ApiProperty({
    description:'Product ID',
    example:1
  })
  @IsInt()
  product_id:number;

  @ForeignKey(()=>Customer)
  @Column
  @ApiProperty({
    description:'Customer ID',
    example:1
  })
  @IsInt()
  customer_id:number;

  @ForeignKey(()=>Order_product)
  @Column
  @ApiProperty({
    description:'Order Product ID',
    example:1
  })
  @IsInt()
  order_id:number;

  @Column
  @ApiProperty({
    description: 'Shipping company',
    example: 'FedEx',
  })
  @IsString()
  ship_company: string;

  @Column
  @ApiProperty({
    description: 'Track ID',
    example: '7878h#75689@3',
  })
  @IsString()
  track_id: string;

  @Column({
    type: DataType.ENUM(...Object.keys(status)),
    defaultValue: status.new,
  })
  @ApiProperty({
    description: 'Status',
    example: 'New',
    default:status.new
  })
  @IsEnum(Object.keys(status))
  status: status;

  @BelongsTo(()=>Add_product,'product_id')
  product:Add_product

  @BelongsTo(()=>Customer,'customer_id')
  customer:Customer

  @BelongsTo(()=>Order_product,'order_id')
  order:Order_product


}
