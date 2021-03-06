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
import {
  Created,
  ErrorResponse,
  Result,
  NotFound,
} from '../../core/utils/responses';
import { NotFoundError } from '../../core/utils/errors';
import { Country } from './entities/country.entity';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
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

@ApiTags('country')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(Country)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  /**
   * Create a new Country
   */
  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ResponseCreated(Country)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    const { error, data } = await this.countryService.create(
      new Job({
        owner,
        action: 'create',
        body: createCountryDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { country: data }, message: 'Created' });
  }

  /**
   * Update a Country using id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a country using id' })
  @ResponseUpdated(Country)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    const { error, data } = await this.countryService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateCountryDto,
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
    return Result(res, { data: { country: data }, message: 'Updated' });
  }

  /**
   * Return all Countries list
   */
  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiQueryGetAll()
  @ResponseGetAll(Country)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.countryService.findAll(
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
      data: { countries: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one Country
   */
  @Get('find')
  @ApiOperation({ summary: 'Find a country' })
  @ApiQueryGetOne()
  @ResponseGetOne(Country)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.countryService.findOne(
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
    return Result(res, { data: { country: data }, message: 'Ok' });
  }

  /**
   * Get a Country by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a country using id' })
  @ApiQueryGetById()
  @ResponseGetOne(Country)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.countryService.findById(
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
    return Result(res, { data: { country: data }, message: 'Ok' });
  }

  /**
   * Delete a Country using id
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country using id' })
  @ResponseDeleted(Country)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.countryService.delete(
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
    return Result(res, { data: { country: data }, message: 'Deleted' });
  }
}
