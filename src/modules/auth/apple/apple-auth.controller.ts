import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Unauthorized, Result } from '../../../core/utils/responses';
import { Owner, OwnerDto } from '../../../decorators/owner.decorator';
import { User } from '../../user/entities/user.entity';
import { Public } from '../../../decorators/public.decorator';
import { AppleAuthGuard } from './apple-auth.guard';
import { AppleAuthDto } from './apple-auth.dto';
import { AuthService } from '../auth.service';

@ApiTags('auth')
@ApiForbiddenResponse({
  description: 'Forbidden',
  schema: {
    properties: {
      message: {
        type: 'string',
        example: 'Forbidden',
      },
    },
  },
})
@ApiInternalServerErrorResponse({
  description: 'Server error',
  schema: {
    properties: {
      error: {
        type: 'object',
      },
      message: {
        type: 'string',
        example: 'Server error',
      },
    },
  },
})
@ApiExtraModels(User)
@Controller('auth/apple')
export class AppleAuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login with apple access token
   */
  @Post('')
  @Public()
  @ApiOperation({ summary: 'Apple token authentication' })
  @ApiOkResponse({
    description: 'Login success',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            user: {
              $ref: getSchemaPath(User),
            },
            token: {
              type: 'string',
            },
            token_expiry: {
              type: 'string',
              format: 'date-time',
            },
            refresh_token: {
              type: 'string',
            },
          },
        },
        message: {
          type: 'string',
          example: 'Created',
        },
      },
    },
  })
  @UseGuards(AppleAuthGuard)
  async appleLogin(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() auth: AppleAuthDto,
  ) {
    const { error, data } = await this.authService.createSession(
      owner,
      auth.info,
    );
    if (!!error) {
      return Unauthorized(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data, message: 'Login success' });
  }
}
