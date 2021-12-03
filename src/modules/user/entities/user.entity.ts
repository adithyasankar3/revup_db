import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  BelongsTo,
  ForeignKey,
  DefaultScope,
  BeforeSave,
  BeforeCreate,
  DataType,
} from 'sequelize-typescript';
import { Entity } from '../../../core/modules/database/entity';
import { Role } from '../../role/entities/role.entity';
import { generateHash, uuid } from '../../../core/utils/helpers';
import { AuthProvider } from '../../auth/auth-provider.enum';
import {
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsNumberString,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

@DefaultScope(() => ({
  attributes: { exclude: ['password', 'deleted_at'] },
}))
@Table
export class User extends Entity<User> {
  @ForeignKey(() => Role)
  @Column
  @ApiProperty({
    format: 'int32',
    description: 'Role ID',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Max(2)
  role_id: number;

  @Column({ unique: 'uid' })
  @ApiProperty({
    description: 'Unique ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  uid: string;

  @Column({
    type: DataType.ENUM(...Object.keys(AuthProvider)),
    defaultValue: 'Local',
  })
  @ApiProperty({
    enum: AuthProvider,
    description: 'Auth Provider',
    example: 'Local',
    readOnly: true,
  })
  provider: AuthProvider;

  @Column
  @ApiProperty({
    description: 'Google ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  google_id?: string;

  @Column
  @ApiProperty({
    description: 'Facebook ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  facebook_id?: string;

  @Column
  @ApiProperty({
    description: 'Firebase ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  firebase_id?: string;

  @Column
  @ApiProperty({
    description: 'Apple ID',
    example: 'a926d382-6741-4d95-86cf-1f5c421cf654',
    readOnly: true,
  })
  apple_id?: string;

  @Column
  @ApiProperty({
    description: 'First Name',
    example: 'Ross',
  })
  @IsString()
  first_name: string;

  @Column
  @ApiProperty({
    description: 'Last Name',
    example: 'Geller',
  })
  @IsString()
  last_name: string;

  @Column
  @ApiProperty({
    description: 'Full Name',
    example: 'Ross Geller',
    readOnly: true,
  })
  full_name?: string;

  @Column
  @ApiProperty({
    description: 'Email',
    example: 'ross.geller@gmail.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @Column({ type: DataType.STRING(7), defaultValue: '+1' })
  @ApiProperty({
    description: 'Phone Code',
    example: '+91',
  })
  @IsString()
  phone_code: string;

  @Column(DataType.STRING(20))
  @ApiProperty({
    description: 'Phone',
    example: '9999999999',
  })
  @IsNumberString()
  phone: string;

  @Column
  @ApiProperty({
    description: 'Password',
    example: '123456',
    writeOnly: true,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Send Email?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  send_email?: boolean;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Send SMS?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  send_sms?: boolean;

  @Column({ defaultValue: true })
  @ApiProperty({
    description: 'Send Push?',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  send_push?: boolean;

  @Column
  @ApiProperty({
    format: 'date-time',
    description: 'Last Login At',
    example: '2021-01-01T00:00:00Z',
    readOnly: true,
  })
  last_login_at?: Date;

  @BelongsTo(() => Role)
  role: Role;

  @BeforeSave
  static setFullName(instance: User) {
    if (!!instance.first_name && !!instance.last_name) {
      instance.full_name = `${instance.first_name} ${instance.last_name}`;
    }
  }

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (!!instance.password) {
      instance.password = await generateHash(instance.password);
    }
  }

  @BeforeCreate
  static setUuid(instance: User) {
    instance.uid = uuid();
  }
}
