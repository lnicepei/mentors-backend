import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bookingProvider')
export class BookingProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.provider, {
    onDelete: 'CASCADE', // will delete all accommodations of this provider
  })
  accommodations: Accommodation[];
}
