import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatuses } from 'src/types';

export default class UpdateOrderDTO {
  @IsString()
  @IsOptional()
  detailsText?: string;

  @IsNumber()
  @IsOptional()
  @Min(1, {
    message: 'O prazo em dias precisa ser maior que 0',
  })
  deadline?: number;

  @IsOptional()
  @IsIn(Object.values(OrderStatuses))
  status?: OrderStatuses;
}
