import {
  Controller,
  Req,
  Res,
  Body,
  Param,
  Query,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Job } from '../../core/utils/job';
import { Owner, OwnerDto } from '../../decorators/owner.decorator';
import { ErrorResponse, Result, NotFound } from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Template } from './entities/template.entity';
import { TemplateService } from './template.service';
import { UpdateTemplateDto } from './dto/update-template.dto';
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
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@ApiTags('template')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Template)
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  /**
   * Update a Template using id
   */
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a template using id' })
  @ResponseUpdated(Template)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    const { error, data } = await this.templateService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateTemplateDto,
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
    return Result(res, { data: { template: data }, message: 'Updated' });
  }

  /**
   * Return all Templates list
   */
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all templates' })
  @ApiQueryGetAll()
  @ResponseGetAll(Template)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.templateService.findAll(
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
      data: { templates: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one Template
   */
  @Get('find')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Find a template' })
  @ApiQueryGetOne()
  @ResponseGetOne(Template)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.templateService.findOne(
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
    return Result(res, { data: { template: data }, message: 'Ok' });
  }

  /**
   * Get a Template by id
   */
  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get a template using id' })
  @ApiQueryGetById()
  @ResponseGetOne(Template)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.templateService.findById(
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
    return Result(res, { data: { template: data }, message: 'Ok' });
  }
}
