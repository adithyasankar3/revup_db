import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Admin extends Entity<Admin> {
  @Index
  @Column
  @ApiProperty({
    description: 'Email',
    example: 'admin@gmail.com',
  })
  @IsString()
  email: string;

  @Column
  @ApiProperty({
    description: 'password',
    example: 'admin#@123',
  })
  @IsString()
  password: string;

  @Column
  @ApiProperty({
    description: 'photo',
    example: 'admin.jpg',
  })
  @IsString()
  photo: string;

  @Column
  @ApiProperty({
    description: 'Stripe Email',
    example: 'adminstripe@gmail.com',
  })
  @IsString()
  stripe: string;

  @Column
  @ApiProperty({
    description: 'Service charge',
    example: '40',
  })
  @IsNumber()
  service_chrg: number;
}
