import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import PrismaService from '@modules/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found!');

    const { hash, salt } = await this.prismaService.auth.findFirst({
      where: {
        userId: user.id,
      },
    });

    const compareHash = await bcrypt.hash(password, salt);
    const isEqual = compareHash === hash;

    if (!isEqual) throw new UnauthorizedException();

    return user;
  }

  async login(user: User) {
    return { accessToken: this.jwtService.sign({ sub: user.id, ...user }) };
  }
}
