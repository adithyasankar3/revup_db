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
import { Bank_account } from './entities/bank_account.entity';
import { Bank_accountService } from './bank_account.service';
import { CreateBank_accountDto } from './dto/create-bank_account.dto';
import { UpdateBank_accountDto } from './dto/update-bank_account.dto';
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

const entity = snakeCase(Bank_account.name);

@ApiTags(entity)
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Bank_account)
@Controller(entity)
export class Bank_accountController {
  constructor(
    private readonly bank_accountService: Bank_accountService,
    private client: MsClientService,
  ) {}

  /**
   * Queue listener for Bank_account
   */
  @MsListener(`controller.${entity}`)
  async execute(job: Job): Promise<void> {
    job = new Job(job);
    await this.bank_accountService[job.action]<JobResponse>(job);
    await this.client.jobDone(job);
  }
  /**
   * Create a new entity
   */
  @Post()
  @ApiOperation({ summary: `Create new ${entity}` })
  @ResponseCreated(Bank_account)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createBank_accountDto: CreateBank_accountDto,
  ) {
    const { error, data } = await this.bank_accountService.create(
      new Job({
        owner,
        action: 'create',
        body: createBank_accountDto,
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
  @ResponseUpdated(Bank_account)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateBank_accountDto: UpdateBank_accountDto,
  ) {
    const { error, data } = await this.bank_accountService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateBank_accountDto,
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
  @ResponseGetAll(Bank_account)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.bank_accountService.findAll(
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
    const { error, count } = await this.bank_accountService.getCount(
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
  @ResponseGetOne(Bank_account)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.bank_accountService.findOne(
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
  @ResponseGetOne(Bank_account)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.bank_accountService.findById(
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
  @ResponseDeleted(Bank_account)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.bank_accountService.delete(
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
