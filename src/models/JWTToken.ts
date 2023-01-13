import { ApiProperty } from '@nestjs/swagger';

export default class JWTTokenModel {
  @ApiProperty()
  accessToken: string;
}
