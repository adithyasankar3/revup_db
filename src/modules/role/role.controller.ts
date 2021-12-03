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
import { Role as RoleModel } from './entities/role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
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

@ApiTags('role')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(RoleModel)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * Create a new Role
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new role' })
  @ResponseCreated(RoleModel)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createRoleDto: CreateRoleDto,
  ) {
    const { error, data } = await this.roleService.create(
      new Job({
        owner,
        action: 'create',
        body: createRoleDto,
      }),
    );

    if (!!error) {
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { role: data }, message: 'Created' });
  }

  /**
   * Update a Role using id
   */
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a role using id' })
  @ResponseUpdated(RoleModel)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    const { error, data } = await this.roleService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateRoleDto,
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
    return Result(res, { data: { role: data }, message: 'Updated' });
  }

  /**
   * Return all Roles list
   */
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiQueryGetAll()
  @ResponseGetAll(RoleModel)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.roleService.findAll(
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
      data: { roles: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one Role
   */
  @Get('find')
  @ApiOperation({ summary: 'Find a role' })
  @ApiQueryGetOne()
  @ResponseGetOne(RoleModel)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.roleService.findOne(
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
    return Result(res, { data: { role: data }, message: 'Ok' });
  }

  /**
   * Get a Role by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a role using id' })
  @ApiQueryGetById()
  @ResponseGetOne(RoleModel)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.roleService.findById(
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
    return Result(res, { data: { role: data }, message: 'Ok' });
  }

  /**
   * Delete a Role using id
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a role using id' })
  @ResponseDeleted(RoleModel)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.roleService.delete(
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
    return Result(res, { data: { role: data }, message: 'Deleted' });
  }
}
