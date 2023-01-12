import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginDTO from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Login')
  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginDTO) {
    const user = await this.authService.validateUser(email, password);

    return this.authService.login(user);
  }

  @ApiTags('Validate Token')
  @Post('validate-token')
  @HttpCode(202)
  async validateToken(@Body() { token }: { token: string }) {
    await this.authService.validateToken(token);
  }
}
