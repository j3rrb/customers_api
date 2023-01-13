import PrismaService from '@modules/prisma/prisma.service';
import { UsersService } from '@modules/users/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  const TEST_SALT = '$2b$10$QoXvMSmaNj4UAK9FCm4HAO';
  const TEST_HASH =
    '$2b$10$QoXvMSmaNj4UAK9FCm4HAOrUaZLGDca5ieXFBZVqTCfQqa7pNB5fq';
  const TEST_PASS = '123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('O serviço deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('Deve lançar uma exceção ao verificar se o usuário existe', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);

    await expect(service.validateUser('', '')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve lançar uma exceção ao verificar se os dados de autenticação existem', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});
    prisma.auth.findFirst = jest.fn().mockReturnValueOnce(null);

    await expect(service.validateUser('', '')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Deve lançar uma exceção ao comparar as hashes da senha do usuário', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});
    prisma.auth.findFirst = jest.fn().mockReturnValueOnce({
      salt: TEST_SALT,
      hash: 'teste',
    });

    await expect(service.validateUser('', TEST_PASS)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('Não deve lançar uma exceção ao verificar se o usuário existe', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});

    await expect(service.validateUser('', '')).rejects.not.toThrow(
      NotFoundException,
    );
  });

  it('Não deve lançar uma exceção ao verificar se os dados de autenticação existem', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});
    prisma.auth.findFirst = jest.fn().mockReturnValueOnce({
      salt: TEST_SALT,
      hash: TEST_HASH,
    });

    await expect(service.validateUser('', '123')).resolves.not.toThrow(
      NotFoundException,
    );
  });

  it('Não deve lançar uma exceção ao comparar as hashes da senha do usuário', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce({});
    prisma.auth.findFirst = jest.fn().mockReturnValueOnce({
      salt: TEST_SALT,
      hash: TEST_HASH,
    });

    await expect(service.validateUser('', TEST_PASS)).resolves.not.toThrow(
      UnauthorizedException,
    );
  });
});
