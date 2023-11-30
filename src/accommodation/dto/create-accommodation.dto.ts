import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
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

export type TSortOptions =
  | 'price:asc'
  | 'price:desc'
  | 'rating:asc'
  | 'rating:desc';

export type TPriceOptions = `${number}-${number}`;

export type TSearchOptions = IPaginationOptions & {
  sort: TSortOptions | '';
  price: TPriceOptions;
};
