import { IsNumber, IsString, Min } from 'class-validator';

export default class CreateOrderDTO {
  @IsNumber()
  customerId: number;

  @IsNumber()
  architectId: number;

  @IsString()
  detailsText: string;

  @IsNumber()
  @Min(1, {
    message: 'O prazo em dias precisa ser maior que 0',
  })
  deadline: number;
}
