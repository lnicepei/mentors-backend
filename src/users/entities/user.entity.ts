import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// used to set types of columns in DB
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user, {
    onDelete: 'CASCADE',
  })
  reservations: Reservation[];

  @CreateDateColumn()
  cratedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
