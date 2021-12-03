import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Query,
  Get,
  Post,
  Put,
  ParseArrayPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Job } from '../../core/utils/job';
import { Owner, OwnerDto } from '../../decorators/owner.decorator';
import { ErrorResponse, Result, NotFound } from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Setting } from './entities/setting.entity';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { UpdateBulkSettingDto } from './dto/update-bulk-settings.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import {
  ResponseForbidden,
  ResponseInternalServerError,
} from '../../core/utils/definitions';
import {
  ApiQueryGetAll,
  ApiQueryGetById,
  ApiQueryGetOne,
  ResponseGetAll,
  ResponseGetOne,
  ResponseUpdated,
} from '../../core/utils/decorators';

@ApiTags('setting')
@ApiBearerAuth()
@Roles(Role.Admin)
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Setting)
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  /**
   * Update a Setting using id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a setting using id' })
  @ResponseUpdated(Setting)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    const { error, data } = await this.settingService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateSettingDto,
      }),
    );

    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data: { setting: data }, message: 'Updated' });
  }

  /**
   * Update bulk settings
   */
  @Post('bulk')
  @ApiExtraModels(UpdateBulkSettingDto)
  @ApiOperation({ summary: 'Update bulk settings' })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(UpdateBulkSettingDto),
      },
    },
  })
  @ApiOkResponse({
    description: 'Updated',
    schema: {
      properties: {
        data: {
          type: 'object',
          properties: {
            settings: {
              type: 'array',
              items: {
                $ref: getSchemaPath(Setting),
              },
            },
          },
        },
        message: {
          type: 'string',
          example: 'Updated',
        },
      },
    },
  })
  async updateBulk(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body(new ParseArrayPipe({ items: UpdateBulkSettingDto }))
    updateBulkSettingsDto: UpdateBulkSettingDto[],
  ) {
    const { error, data } = await this.settingService.updateBulk(
      new Job({
        owner,
        action: 'updateBulk',
        records: updateBulkSettingsDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data: { settings: data }, message: 'Updated' });
  }

  /**
   * Return all Settings list
   */
  @Get()
  @ApiOperation({ summary: 'Get all settings' })
  @ApiQueryGetAll()
  @ResponseGetAll(Setting)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.settingService.findAll(
        new Job({
          owner,
          action: 'findAll',
          options: { ...query },
        }),
      );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, {
      data: { settings: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one Setting
   */
  @Get('find')
  @ApiOperation({ summary: 'Find a setting' })
  @ApiQueryGetOne()
  @ResponseGetOne(Setting)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.settingService.findOne(
      new Job({
        owner,
        action: 'findOne',
        options: { ...query },
      }),
    );

    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data: { setting: data }, message: 'Ok' });
  }

  /**
   * Get a Setting by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a setting using id' })
  @ApiQueryGetById()
  @ResponseGetOne(Setting)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.settingService.findById(
      new Job({
        owner,
        action: 'findById',
        id: +id,
        options: { ...query },
      }),
    );

    if (!!error) {
      if (error instanceof NotFoundError) {
        return NotFound(res, {
          error,
          message: `Record not found`,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Result(res, { data: { setting: data }, message: 'Ok' });
  }
}
