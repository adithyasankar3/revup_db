import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Table, Column, Index } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Card_details extends Entity<Card_details> {
  @Index
  @Column
  @ApiProperty({
    description: 'Card Number',
    example: '898986758312',
  })
  @IsNumber()
  card_number: number;

  @Column
  @ApiProperty({
    description: 'Card Holder Name',
    example: 'Jack MIller',
  })
  @IsString()
  card_holder_name: string;

  @Column
  @ApiProperty({
    description: 'Expires On',
    example: '12/23',
  })
  @IsString()
  card_expire: string;

  @Column
  @ApiProperty({
    description: 'Card CVV',
    example: '123',
  })
  @IsNumber()
  card_cvv: number;
}
