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
  Delete,
  Render,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Job } from '../../core/utils/job';
import { Owner, OwnerDto } from '../../decorators/owner.decorator';
import {
  Created,
  ErrorResponse,
  Result,
  NotFound,
} from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Page } from './entities/page.entity';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
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
  ResponseCreated,
  ResponseDeleted,
  ResponseGetAll,
  ResponseGetOne,
  ResponseUpdated,
} from '../../core/utils/decorators';
import { Public } from '../../decorators/public.decorator';

@ApiTags('page')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Page)
@Controller('page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private configService: ConfigService,
  ) {}

  /**
   * Create a new CMS page
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new page' })
  @ResponseCreated(Page)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createPageDto: CreatePageDto,
  ) {
    const { error, data } = await this.pageService.create(
      new Job({
        owner,
        action: 'create',
        body: createPageDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { page: data }, message: 'Created' });
  }

  /**
   * Update a CMS page using id
   */
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a page using id' })
  @ResponseUpdated(Page)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    const { error, data } = await this.pageService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updatePageDto,
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
    return Result(res, { data: { page: data }, message: 'Updated' });
  }

  /**
   * Return all CMS pages list
   */
  @Get()
  @ApiOperation({ summary: 'Get all pages' })
  @ApiQueryGetAll()
  @ResponseGetAll(Page)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.pageService.findAll(
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
      data: { pages: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one CMS page
   */
  @Get('find')
  @ApiOperation({ summary: 'Find a page' })
  @ApiQueryGetOne()
  @ResponseGetOne(Page)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.pageService.findOne(
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
    return Result(res, { data: { page: data }, message: 'Ok' });
  }

  /**
   * Get a CMS page by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a page using id' })
  @ApiQueryGetById()
  @ResponseGetOne(Page)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.pageService.findById(
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
    return Result(res, { data: { page: data }, message: 'Ok' });
  }

  /**
   * Delete a CMS page using id
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a page using id' })
  @ResponseDeleted(Page)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.pageService.delete(
      new Job({
        owner,
        action: 'delete',
        id: +id,
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
    return Result(res, { data: { page: data }, message: 'Deleted' });
  }

  @Get(':name/webview')
  @Public()
  @Render('page')
  async webview(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('name') name: string,
  ) {
    const { error, data } = await this.pageService.findOne(
      new Job({
        owner,
        action: 'findOne',
        options: {
          where: {
            name,
          },
        },
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
    return {
      app_name: this.configService.get('appName'),
      ...data.toJSON(),
    };
  }
}
