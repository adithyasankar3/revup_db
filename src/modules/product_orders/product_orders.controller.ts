import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
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
import { Job, JobResponse } from '../../core/utils/job';
import { Owner, OwnerDto } from '../../decorators/owner.decorator';
import {
  Created,
  ErrorResponse,
  NotFound,
  Result,
} from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Product_orders } from './entities/product_orders.entity';
import { Product_ordersService } from './product_orders.service';
import { CreateProduct_ordersDto } from './dto/create-product_orders.dto';
import { UpdateProduct_ordersDto } from './dto/update-product_orders.dto';
import { MsClientService } from '../../core/modules/ms-client/ms-client.service';
import {
  ResponseForbidden,
  ResponseInternalServerError,
} from '../../core/utils/definitions';
import {
  ApiQueryCountAll,
  ApiQueryGetAll,
  ApiQueryGetById,
  ApiQueryGetOne,
  MsListener,
  ResponseCountAll,
  ResponseCreated,
  ResponseDeleted,
  ResponseGetAll,
  ResponseGetOne,
  ResponseUpdated,
} from '../../core/utils/decorators';
import { pluralizeString, snakeCase } from '../../core/utils/helpers';

const entity = snakeCase(Product_orders.name);

@ApiTags(entity)
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Product_orders)
@Controller(entity)
export class Product_ordersController {
  constructor(
    private readonly product_ordersService: Product_ordersService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Product_orders
   */
  @MsListener(`controller.${entity}`)
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.product_ordersService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
  /**
   * Create a new entity
   */
  @Post()
  @ApiOperation({ summary: `Create new ${entity}` })
  @ResponseCreated(Product_orders)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createProduct_ordersDto: CreateProduct_ordersDto,
  ) {
    const { error, data } = await this.product_ordersService.create(
      new Job({
        owner,
        action: 'create',
        body: createProduct_ordersDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { [entity]: data }, message: 'Created' });
  }

  /**
   * Update entity using id
   */
  @Put(':id')
  @ApiOperation({ summary: `Update ${entity} using id` })
  @ResponseUpdated(Product_orders)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateProduct_ordersDto: UpdateProduct_ordersDto,
  ) {
    const { error, data } = await this.product_ordersService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateProduct_ordersDto,
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
    return Result(res, { data: { [entity]: data }, message: 'Updated' });
  }

  /**
   * Return all entities list
   */
  @Get()
  @ApiOperation({ summary: `Get all ${pluralizeString(entity)}` })
  @ApiQueryGetAll()
  @ResponseGetAll(Product_orders)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.product_ordersService.findAll(
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
      data: { [pluralizeString(entity)]: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Return count of entities
   */
  @Get('count')
  @ApiOperation({ summary: `Get count of ${pluralizeString(entity)}` })
  @ApiQueryCountAll()
  @ResponseCountAll()
  async countAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, count } = await this.product_ordersService.getCount(
      new Job({
        owner,
        action: 'getCount',
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
      data: { count },
      message: 'Ok',
    });
  }

  /**
   * Find one entity
   */
  @Get('find')
  @ApiOperation({ summary: `Find one ${entity}` })
  @ApiQueryGetOne()
  @ResponseGetOne(Product_orders)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.product_ordersService.findOne(
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
    return Result(res, { data: { [entity]: data }, message: 'Ok' });
  }

  /**
   * Find entity using id
   */
  @Get(':id')
  @ApiOperation({ summary: `Find ${entity} using id` })
  @ApiQueryGetById()
  @ResponseGetOne(Product_orders)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.product_ordersService.findById(
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
    return Result(res, { data: { [entity]: data }, message: 'Ok' });
  }

  /**
   * Delete entity using id
   */
  @Delete(':id')
  @ApiOperation({ summary: `Delete ${entity} using id` })
  @ResponseDeleted(Product_orders)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.product_ordersService.delete(
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
    return Result(res, { data: { [entity]: data }, message: 'Deleted' });
  }
}
