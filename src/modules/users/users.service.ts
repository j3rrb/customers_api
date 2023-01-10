import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import PrismaService from '@modules/prisma/prisma.service';
import createPassword from '../../utils/createPassword';
import { Roles } from 'types';
import CreateUserDTO from './dtos/create.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async listAll(role?: Roles): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        role,
      },
    });
  }

  async create(data: CreateUserDTO): Promise<User> {
    const existentUser = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existentUser) throw new ConflictException('User already exists!');

    const { hash, salt } = await createPassword(data.password);

    const user = await this.prismaService.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        primaryPhoneNumber: data.primaryPhoneNumber,
        email: data.email,
        secondaryPhoneNumber: data.secondaryPhoneNumber,
        role: data.role,
        auth: {
          create: {
            hash,
            salt,
          },
        },
      },
    });

    return user;
  }
}
