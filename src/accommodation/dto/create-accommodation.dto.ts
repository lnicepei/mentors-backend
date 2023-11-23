import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GeoJSON } from 'typeorm';

export class CreateAccommodationDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  location: GeoJSON;

  @IsNotEmpty()
  @IsDecimal()
  rating: number;
}
