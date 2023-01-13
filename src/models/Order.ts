import { ApiProperty } from '@nestjs/swagger';
import { OrderStatuses } from 'src/types';

export default class OrderModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  architectId: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  detailsText: string;

  @ApiProperty()
  deadlineInDays: number;

  @ApiProperty({ enum: Object.values(OrderStatuses) })
  status: OrderStatuses;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
