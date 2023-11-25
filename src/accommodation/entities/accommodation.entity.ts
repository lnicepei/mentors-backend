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
  @PrimaryGeneratedColumn({ name: 'accommodation_id' })
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column('geometry')
  location: GeoJSON;

  @Column('decimal')
  rating: number;

  @CreateDateColumn()
  cratedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BookingProvider, (provider) => provider.accommodations)
  provider: BookingProvider;

  @OneToMany(() => Reservation, (reservation) => reservation.accommodation, {
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];
}
