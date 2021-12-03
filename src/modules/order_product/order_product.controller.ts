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
import { Order_product } from './entities/order_product.entity';
import { Order_productService } from './order_product.service';
import { CreateOrder_productDto } from './dto/create-order_product.dto';
import { UpdateOrder_productDto } from './dto/update-order_product.dto';
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

const entity = snakeCase(Order_product.name);

@ApiTags(entity)
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Order_product)
@Controller(entity)
export class Order_productController {
  constructor(
    private readonly order_productService: Order_productService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Order_product
   */
  @MsListener(`controller.${entity}`)
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.order_productService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
  /**
   * Create a new entity
   */
  @Post()
  @ApiOperation({ summary: `Create new ${entity}` })
  @ResponseCreated(Order_product)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createOrder_productDto: CreateOrder_productDto,
  ) {
    const { error, data } = await this.order_productService.create(
      new Job({
        owner,
        action: 'create',
        body: createOrder_productDto,
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
  @ResponseUpdated(Order_product)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateOrder_productDto: UpdateOrder_productDto,
  ) {
    const { error, data } = await this.order_productService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateOrder_productDto,
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
  @ResponseGetAll(Order_product)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.order_productService.findAll(
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
    const { error, count } = await this.order_productService.getCount(
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
  @ResponseGetOne(Order_product)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.order_productService.findOne(
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
  @ResponseGetOne(Order_product)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.order_productService.findById(
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
  @ResponseDeleted(Order_product)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.order_productService.delete(
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
