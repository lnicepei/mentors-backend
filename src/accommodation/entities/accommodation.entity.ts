import { ApiProperty } from '@nestjs/swagger';
import { BookingProvider } from 'src/booking-provider/entities/booking-provider.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  GeoJSON,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('accommodations')
export class Accommodation {
  @ApiProperty({ example: '4', description: 'Numeric id' })
  @PrimaryGeneratedColumn({ name: 'accommodation_id' })
  id?: number;

  @ApiProperty({
    example: 'Radisson Blu Minsk 4*',
    description: 'Accommodation name',
  })
  @Column()
  name: string;

  @ApiProperty({
    example:
      'Radisson Blu Minsk is a luxurious 4-star hotel located in the vibrant city of Minsk. Nestled in a prime location, this hotel offers a perfect blend of elegance and modernity, providing guests with a truly exceptional stay.',
    description: 'Hotel description',
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 300,
    description: 'Price of stay per night in u.s. dollars',
  })
  @Column()
  price: number;

  @ApiProperty({
    example: [55.784880966308116, 37.626230413110996],
    description: 'Location in GeoJSON format',
  })
  @Column('geometry')
  location: GeoJSON;

  @ApiProperty({
    example: 8.9,
    description: 'Rating',
  })
  @Column('decimal')
  rating: number;

  @ApiProperty({
    example: '2023-11-25 21:27:20.807',
    description: 'Created At date',
  })
  @CreateDateColumn()
  cratedAt: Date;

  @ApiProperty({
    example: '2023-11-25 21:27:20.807',
    description: 'Updated At date',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BookingProvider, (provider) => provider.accommodations)
  provider: BookingProvider;

  @OneToMany(() => Reservation, (reservation) => reservation.accommodation, {
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];
}
