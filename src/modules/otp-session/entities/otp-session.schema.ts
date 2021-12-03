import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ParentSchema } from '../../../core/modules/mongo/parent-schema';

export type OtpSessionDocument = OtpSession & Document;

@Schema({
  collection: 'otp_sessions',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class OtpSession extends ParentSchema {
  @Prop()
  @ApiProperty({
    format: 'int32',
    description: 'User ID',
    example: 1,
  })
  user_id: number;

  @Prop()
  @ApiProperty({
    description: 'OTP',
    example: '123456',
  })
  otp: string;

  @Prop()
  @ApiProperty({
    description: 'Type',
    example: 'Forgot',
  })
  type: 'Forgot' | 'Signup';

  @Prop({
    default: false,
  })
  @ApiProperty({
    description: 'Verified?',
    example: false,
  })
  verified: boolean;

  @Prop()
  @ApiProperty({
    format: 'date-time',
    description: 'Expire At',
    example: '2021-01-01T00:00:00Z',
  })
  expire_at: Date;
}

export const OtpSessionSchema = SchemaFactory.createForClass(OtpSession);
