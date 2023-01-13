import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/guards/jwt.guard';
import UserModel from 'src/models/User';
import { Roles } from 'src/types';
import CreateUserDTO from './dtos/create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('Criar um usuário')
  @ApiOkResponse({
    type: UserModel,
  })
  @Post('create')
  async create(@Body() data: CreateUserDTO): Promise<User> {
    const user = await this.userService.create(data);

    return user;
  }

  @ApiTags('Listar usuários com o filtro opcional de tipo de usuário')
  @ApiQuery({ name: 'status', enum: Roles })
  @ApiOkResponse({
    type: [UserModel],
  })
  @UseGuards(JwtGuard)
  @Get('list/all')
  async listAll(@Query('role') role?: Roles): Promise<User[]> {
    const users = await this.userService.listAll(role);

    return users;
  }
}
