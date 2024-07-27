import { IsString, IsDate } from 'class-validator';
import { CreateItemDto } from '../items/create-item.dto';

export class CreateOrderDto {
  @IsString()
  client: string;

  @IsDate()
  date: Date;

  @IsString()
  payment: string;

  items: CreateItemDto[];
}
