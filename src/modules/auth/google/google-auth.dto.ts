import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'Access Token',
    example: 'token',
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'Additional session info',
    default: {},
  })
  info: any;
}
