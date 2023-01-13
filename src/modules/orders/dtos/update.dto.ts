import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatuses } from 'src/types';

export default class UpdateOrderDTO {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  detailsText?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Min(1, {
    message: 'O prazo em dias precisa ser maior que 0',
  })
  deadline?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(Object.values(OrderStatuses))
  status?: OrderStatuses;
}
