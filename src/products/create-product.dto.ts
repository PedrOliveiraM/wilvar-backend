import { IsString, IsNumber } from 'class-validator';
// precisa instalar o class-validator
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  costPrice: number;

  @IsNumber()
  salePrice: number;

  @IsNumber()
  quantity: number;
}
