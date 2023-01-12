import PrismaService from '@modules/prisma/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatuses } from 'src/types';
import CreateOrderDTO from './dtos/create.dto';
import UpdateOrderDTO from './dtos/update.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrder(orderId: number) {
    return await this.prismaService.order.findUnique({
      where: { id: +orderId },
      include: {
        architect: true,
        customer: true,
      },
    });
  }

  async listOrdersByCustomer(customerId: number, status?: OrderStatuses) {
    const orders = await this.prismaService.order.findMany({
      where: {
        status,
        customerId: +customerId,
      },
      include: {
        architect: true,
        customer: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return orders;
  }

  async listOrdersByArchitect(architectId: number, status?: OrderStatuses) {
    const orders = await this.prismaService.order.findMany({
      where: {
        status,
        architectId: +architectId,
        NOT: {
          status: 'DELETED',
        },
      },
      include: {
        architect: true,
        customer: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return orders;
  }

  async update(id: number, data: UpdateOrderDTO) {
    const order = await this.prismaService.order.findUnique({
      where: { id: +id },
    });

    if (!order) throw new NotFoundException('Solicitação não encontrada!');

    try {
      const newOrder = await this.prismaService.order.update({
        where: {
          id: +id,
        },
        data: {
          deadlineInDays: data.deadline || order.deadlineInDays,
          status: data.status || order.status,
          detailsText: data.detailsText
            ? Buffer.from(data.detailsText, 'utf8')
            : order.detailsText,
        },
      });

      return newOrder;
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível editar a solicitação: ' + error.message,
      );
    }
  }

  async create(data: CreateOrderDTO) {
    const customer = await this.prismaService.user.findUnique({
      where: { id: +data.customerId },
    });

    const architect = await this.prismaService.user.findUnique({
      where: { id: +data.architectId },
    });

    if (!customer) throw new NotFoundException('Cliente não encontrado!');
    if (!architect) throw new NotFoundException('Arquiteto não encontrado!');

    try {
      const order = await this.prismaService.order.create({
        data: {
          architectId: +architect.id,
          customerId: +customer.id,
          deadlineInDays: +data.deadline,
          detailsText: Buffer.from(data.detailsText, 'utf-8'),
        },
      });

      return order;
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível criar a solicitação: ' + error.message,
      );
    }
  }
}
