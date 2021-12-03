import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Table, Column, Index, DataType, HasOne } from 'sequelize-typescript';
import { Product_orders } from 'src/modules/product_orders/entities/product_orders.entity';
import { Entity } from '../../../core/modules/database/entity';
import { status } from '../status.enum'

@Table
export class Add_product extends Entity<Add_product> {
  @Index
  @Column
  @ApiProperty({
    description: 'Product Image',
    example: 'watch.jpg',
  })
  @IsString()
  image: string;

  @Column
  @ApiProperty({
    description: 'Product Title',
    example: 'Watch',
  })
  @IsString()
  product_name: string;

  @Column
  @ApiProperty({
    description: 'Brand Name',
    example: 'Cartier',
  })
  @IsString()
  brand_name: string;

  @Column
  @ApiProperty({
    description: 'Product Price',
    example: '300',
  })
  @IsNumber()
  price: number;

  @Column
  @ApiProperty({
    description: 'Product Stock',
    example: '100',
  })
  @IsNumber()
  stock: number;

  @Column
  @ApiProperty({
    description: 'Product Description',
    example: 'A good product',
  })
  @IsString()
  description: string;

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

  @HasOne(() => Product_orders,'product_id')
  order_in_product_orders: Product_orders;


}
