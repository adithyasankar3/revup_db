import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { Table, Column, DataType } from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';

@Table
export class Template extends Entity<Template> {
  @Column({ unique: 'name' })
  @ApiProperty({
    description: 'Template Name',
    example: 'new_account',
  })
  @IsString()
  name: string;

  @Column
  @ApiProperty({
    description: 'Template Title',
    example: 'New Account',
  })
  @IsString()
  title: string;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Send Email?',
    example: true,
  })
  @IsBoolean()
  send_email: boolean;

  @Column
  @ApiProperty({
    description: 'Email Subject',
    example: 'New account created',
  })
  @IsString()
  email_subject: string;

  @Column(DataType.TEXT)
  @ApiProperty({
    description: 'Email Body',
    example: '<p>HTML content</p>',
  })
  @IsString()
  email_body: string;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Send SMS?',
    example: true,
  })
  @IsBoolean()
  send_sms: boolean;

  @Column
  @ApiProperty({
    description: 'SMS Body',
    example: 'SMS content',
  })
  @IsString()
  sms_body: string;
}
