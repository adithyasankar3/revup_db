import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Table, Column, DataType } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Setting extends Entity<Setting> {
  @Column({ unique: 'name' })
  @ApiProperty({
    description: 'Setting Name',
    example: 'timezone',
  })
  @IsString()
  name: string;

  @Column
  @ApiProperty({
    description: 'Setting Display Name',
    example: 'System Timezone',
  })
  @IsString()
  display_name: string;

  @Column
  @ApiProperty({
    description: 'Setting Value',
    example: 'America/New_York',
  })
  @IsString()
  value: string;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Editable?',
    example: true,
  })
  @IsBoolean()
  editable: boolean;

  @Column({
    type: DataType.TEXT,
    get(this: Setting): any {
      try {
        const tx = this.getDataValue('options');
        return tx ? JSON.parse(tx) : { type: 'text' };
      } catch (error) {
        return null;
      }
    },
  })
  @ApiProperty({
    description: 'Settings Input Options',
    type: 'object',
  })
  options: string;
}
