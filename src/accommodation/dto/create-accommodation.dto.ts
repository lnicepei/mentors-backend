import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GeoJSON } from 'typeorm';

export class CreateAccommodationDto {
  @ApiProperty({ example: 'Radisson Blu Minsk 4*' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Radisson Blu Minsk is a luxurious 4-star hotel located in the vibrant city of Minsk. Nestled in a prime location, this hotel offers a perfect blend of elegance and modernity, providing guests with a truly exceptional stay.',
    description: 'Hotel description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 300,
    description: 'Price of stay per night in u.s. dollars',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: [55.784880966308116, 37.626230413110996],
    description: 'Location in GeoJSON format',
  })
  @IsNotEmpty()
  @IsString()
  location: GeoJSON;

  @ApiProperty({
    example: 8.9,
    description: 'Rating',
  })
  @IsNotEmpty()
  @IsDecimal()
  rating: number;
}
