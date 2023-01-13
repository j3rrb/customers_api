import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export default class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty()
  @IsNumber()
  architectId: number;

  @ApiProperty()
  @IsString()
  detailsText: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, {
    message: 'O prazo em dias precisa ser maior que 0',
  })
  deadline: number;
}
