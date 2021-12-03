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
  ApiOkResponse,
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
  BadRequest,
} from '../../core/utils/responses';
import { NotFoundError, ValidationError } from '../../core/utils/errors';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
import { ChangePasswordDto } from './dto/change-password.dto';
import { OwnerIncludeAttribute } from '../../decorators/owner-attributes.decorator';

@ApiTags('user')
@ApiBearerAuth()
@ApiForbiddenResponse(ResponseForbidden)
@ApiInternalServerErrorResponse(ResponseInternalServerError)
@ApiExtraModels(User)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new User
   */
  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a new user' })
  @ResponseCreated(User)
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { error, data } = await this.userService.create(
      new Job({
        owner,
        action: 'create',
        body: createUserDto,
      }),
    );

    if (!!error) {
      if (error instanceof ValidationError) {
        return BadRequest(res, {
          error,
          message: error.message,
        });
      }
      return ErrorResponse(res, {
        error,
        message: `${error.message || error}`,
      });
    }
    return Created(res, { data: { user: data }, message: 'Created' });
  }

  /**
   * Update logged in user details
   */
  @Put('me')
  @ApiOperation({ summary: 'Update logged in user details' })
  @ResponseUpdated(User)
  async updateMe(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { error, data } = await this.userService.update(
      new Job({
        owner,
        action: 'update',
        id: owner.id,
        body: updateUserDto,
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
    return Result(res, { data: { user: data }, message: 'Updated' });
  }

  /**
   * Change password for logged in user
   */
  @Put('password')
  @ApiOperation({ summary: 'Change password for logged in user' })
  @ApiOkResponse({
    description: 'Success',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'Password changed',
        },
      },
    },
  })
  @OwnerIncludeAttribute('password')
  async changePassword(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const { error } = await this.userService.changePassword(
      new Job({
        owner,
        action: 'changePassword',
        id: owner.id,
        body: changePasswordDto,
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
    return Result(res, { message: 'Password changed' });
  }

  /**
   * Update a User using id
   */
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a user using id' })
  @ResponseUpdated(User)
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { error, data } = await this.userService.update(
      new Job({
        owner,
        action: 'update',
        id: +id,
        body: updateUserDto,
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
    return Result(res, { data: { user: data }, message: 'Updated' });
  }

  /**
   * Return all Users list
   */
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQueryGetAll()
  @ResponseGetAll(User)
  async findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data, offset, limit, count } =
      await this.userService.findAll(
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
      data: { users: data, offset, limit, count },
      message: 'Ok',
    });
  }

  /**
   * Find one User
   */
  @Get('find')
  @ApiOperation({ summary: 'Find a user' })
  @ApiQueryGetOne()
  @ResponseGetOne(User)
  async findOne(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.userService.findOne(
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
    return Result(res, { data: { user: data }, message: 'Ok' });
  }

  /**
   * Get logged in user details
   */
  @Get('me')
  @ApiOperation({ summary: 'Get logged in user details' })
  @ApiQueryGetById()
  @ResponseGetOne(User)
  async findMe(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Query() query: any,
  ) {
    const { error, data } = await this.userService.findById(
      new Job({
        owner,
        action: 'findById',
        id: owner.id,
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
    return Result(res, { data: { user: data }, message: 'Ok' });
  }

  /**
   * Get a User by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a user using id' })
  @ApiQueryGetById()
  @ResponseGetOne(User)
  async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
    @Query() query: any,
  ) {
    const { error, data } = await this.userService.findById(
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
    return Result(res, { data: { user: data }, message: 'Ok' });
  }

  /**
   * Delete a User using id
   */
  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a user using id' })
  @ResponseDeleted(User)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Owner() owner: OwnerDto,
    @Param('id') id: number,
  ) {
    const { error, data } = await this.userService.delete(
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
    return Result(res, { data: { user: data }, message: 'Deleted' });
  }
}
