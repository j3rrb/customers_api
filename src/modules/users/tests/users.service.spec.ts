import PrismaService from '@modules/prisma/prisma.service';
import { ConflictException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { Genders, Roles } from 'src/types';
import CreateUserDTO from '../dtos/create.dto';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('O servicço deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve lançar um erro de conflito ao tentar criar um usuário já existente', async () => {
    prisma.user.findFirst = jest.fn().mockReturnValueOnce({});

    const mock: CreateUserDTO = {
      birthDate: '',
      email: '',
      firstName: '',
      gender: Genders.OTHER,
      lastName: '',
      primaryPhoneNumber: '',
      role: Roles.ARCHITECT,
      password: '',
    };

    await expect(service.create(mock)).rejects.toThrow(ConflictException);
  });

  it('Não deve lançar um erro de conflito ao tentar criar um usuário inexistente', async () => {
    prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);

    const mock: CreateUserDTO = {
      birthDate: '',
      email: '',
      firstName: '',
      gender: Genders.OTHER,
      lastName: '',
      primaryPhoneNumber: '',
      role: Roles.ARCHITECT,
      password: '',
    };

    prisma.user.create = jest.fn().mockResolvedValueOnce({});

    await expect(service.create(mock)).resolves.not.toThrow(ConflictException);
  });
});
