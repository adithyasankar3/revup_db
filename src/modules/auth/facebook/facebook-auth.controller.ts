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
import { FacebookAuthGuard } from './facebook-auth.guard';
import { FacebookAuthDto } from './facebook-auth.dto';
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
@Controller('auth/facebook')
export class FacebookAuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login with facebook access token
   */
  @Post('')
  @Public()
  @ApiOperation({ summary: 'Facebook token authentication' })
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
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() auth: FacebookAuthDto,
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
