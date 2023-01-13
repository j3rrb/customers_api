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

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const authData = await this.prismaService.auth.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!authData) throw new NotFoundException('Auth data not found!');

    const compareHash = await bcrypt.hash(password, authData.salt);
    const isEqual = compareHash === authData.hash;

    if (!isEqual) throw new UnauthorizedException('Não autorizado!');

    return user;
  }

  async login(user: User): Promise<{
    accessToken: string;
  }> {
    return { accessToken: this.jwtService.sign({ sub: user.id, ...user }) };
  }

  async validateToken(token: string): Promise<void> {
    try {
      await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido: ' + error.message);
    }
  }
}
