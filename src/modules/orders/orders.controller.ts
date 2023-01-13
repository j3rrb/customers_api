import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderStatuses } from 'src/types';
import CreateOrderDTO from './dtos/create.dto';
import UpdateOrderDTO from './dtos/update.dto';
import { OrdersService } from './orders.service';
import { JwtGuard } from '@guards/jwt.guard';
import { RolesGuard } from '@guards/role.guard';
import { Order, User } from '@prisma/client';
import OrderModel from 'src/models/Order';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiTags('Retornar uma solicitação')
  @ApiOkResponse({
    type: OrderModel,
  })
  @UseGuards(JwtGuard)
  @Get('get/:orderId')
  async getOrder(
    @Param('orderId') id: number,
  ): Promise<(Order & { architect: User; customer: User }) | null> {
    const order = await this.ordersService.getOrder(id);

    return order;
  }

  @ApiTags('Listar solicitações de um cliente com ou sem filtro por status')
  @ApiQuery({ name: 'status', enum: OrderStatuses })
  @ApiOkResponse({
    type: [OrderModel],
  })
  @UseGuards(JwtGuard)
  @Get('customer/:customerId/list')
  async listCustomerOrders(
    @Param('customerId') id: number,
    @Query('status') status?: OrderStatuses,
  ): Promise<
    (Order & {
      architect: User;
      customer: User;
    })[]
  > {
    const orders = await this.ordersService.listOrdersByCustomer(id, status);

    return orders;
  }

  @ApiTags('Listar solicitações de um arquiteto com ou sem filtro por status')
  @ApiQuery({ name: 'status', enum: OrderStatuses })
  @ApiOkResponse({
    type: [OrderModel],
  })
  @UseGuards(JwtGuard)
  @Get('architect/:architectId/list')
  async listArchitectOrders(
    @Param('architectId') id: number,
    @Query('status') status?: OrderStatuses,
  ): Promise<
    (Order & {
      architect: User;
      customer: User;
    })[]
  > {
    const orders = await this.ordersService.listOrdersByArchitect(id, status);

    return orders;
  }

  @ApiTags('Criar solicitação')
  @ApiOkResponse({
    type: OrderModel,
  })
  @UseGuards(JwtGuard, RolesGuard)
  @Post('create')
  async createOrder(@Body() data: CreateOrderDTO): Promise<Order> {
    const order = await this.ordersService.create(data);

    return order;
  }

  @ApiTags('Editar solicitação')
  @ApiOkResponse({
    type: OrderModel,
  })
  @UseGuards(JwtGuard)
  @Patch('update/:orderId')
  async updateOrder(
    @Body() data: UpdateOrderDTO,
    @Param('orderId') id: number,
  ): Promise<Order> {
    const order = await this.ordersService.update(id, data);

    return order;
  }
}
