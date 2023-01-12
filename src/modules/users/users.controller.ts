import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guards/jwt.guard';
import { Roles } from 'src/types';
import CreateUserDTO from './dtos/create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('Create user')
  @Post('create')
  async create(@Body() data: CreateUserDTO) {
    const user = await this.userService.create(data);

    return user;
  }

  @ApiTags('List all users with optional Role')
  @UseGuards(JwtGuard)
  @Get('list/all')
  async listAll(@Query('role') role?: Roles) {
    const users = await this.userService.listAll(role);

    return users;
  }
}
