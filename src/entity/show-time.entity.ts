import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CinemaEntity } from "./cinema.entity";
import { SeatEntity } from "./seat.entity";

@Entity()
export class ShowTimeEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "date", nullable: false })
  startTime: Date;

  @ManyToOne(() => CinemaEntity, (cinema) => cinema.cinemas)
  cinema: CinemaEntity;

  @OneToMany(() => SeatEntity, (seat) => seat.showTime)
  seats: SeatEntity[];
}
