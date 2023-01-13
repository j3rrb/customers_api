import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import JWTTokenModel from 'src/models/JWTToken';
import { AuthService } from './auth.service';
import LoginDTO from './dtos/login.dto';
import ValidateTokenDTO from './dtos/validate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Fazer o login')
  @ApiOkResponse({
    type: JWTTokenModel,
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginDTO): Promise<{
    accessToken: string;
  }> {
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }

  @ApiTags('Validar token JWT')
  @Post('validate-token')
  @HttpCode(202)
  async validateToken(@Body() { token }: ValidateTokenDTO): Promise<void> {
    await this.authService.validateToken(token);
  }
}
