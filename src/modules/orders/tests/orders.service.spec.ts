import PrismaService from '@modules/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from '@prisma/client';
import { OrdersService } from '../orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, PrismaService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('O serviço deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve lançar um erro de não encontrado ao atualizar uma solicitação inexistente', async () => {
    prisma.order.findUnique = jest.fn().mockReturnValueOnce(null);

    await expect(service.update(0, {})).rejects.toThrow(NotFoundException);
  });

  it('Não deve lançar um erro de não encontrado ao atualizar uma solicitação existente', async () => {
    const mock: Order = {
      deadlineInDays: 1,
      status: 'ACCEPTED',
      detailsText: Buffer.from('test', 'utf8'),
      architectId: 1,
      createdAt: new Date(Date.now()),
      customerId: 1,
      id: 1,
      updatedAt: new Date(Date.now()),
    };

    prisma.order.findUnique = jest.fn().mockReturnValueOnce(mock);
    prisma.order.update = jest.fn().mockResolvedValueOnce({});

    await expect(service.update(0, {})).resolves.not.toThrow(NotFoundException);
  });

  it('Deve lançar um erro de não encontrado ao criar uma solicitação', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);

    await expect(
      service.create({
        architectId: 1,
        customerId: 1,
        deadline: 1,
        detailsText: '',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Não deve lançar um erro de não encontrado ao criar uma solicitação', async () => {
    const mock = {
      deadline: 1,
      detailsText: '',
      customerId: 1,
      architectId: 1,
    };

    prisma.order.findUnique = jest.fn().mockReturnValueOnce({
      id: 1,
      ...mock,
    });

    prisma.order.create = jest.fn().mockResolvedValueOnce({});

    await expect(service.create(mock)).resolves.not.toThrow(NotFoundException);
    await expect(service.create(mock)).resolves.not.toThrow(
      InternalServerErrorException,
    );
  });
});
