import { Accommodation } from 'src/accommodation/entities/accommodation.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Accommodation, (accommodation) => accommodation.reservations)
  @JoinColumn({ name: 'accommodation_id' })
  accommodation: Accommodation;

  @Column({ type: 'date' })
  checkInDate: Date;

  @Column({ type: 'date' })
  checkOutDate: Date;
}
