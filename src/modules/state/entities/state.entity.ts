import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString } from 'class-validator';
import {
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  Index,
} from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import { Country } from '../../country/entities/country.entity';

@Table
export class State extends Entity<State> {
  @Column
  @ForeignKey(() => Country)
  @ApiProperty({
    description: 'Country ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  country_id: number;

  @Column
  @Index
  @ApiProperty({
    description: 'State Name',
    example: 'Alabama',
  })
  @IsString()
  name: string;

  @Column
  @Index
  @ApiProperty({
    description: 'State Code',
    example: 'AL',
  })
  @IsString()
  code: string;

  @BelongsTo(() => Country)
  country: Country;
}
