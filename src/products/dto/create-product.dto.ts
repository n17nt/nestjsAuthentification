import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @Min(0)
  @Max(10000)
  price: number;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  quantity: number;
}
