import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CinemaMovieEntity } from "./cinema-movie.entity";
import { CineplexEntity } from "./cineplex.entity";
import { ShowTimeEntity } from "./show-time.entity";

@Entity()
export class CinemaEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  address: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  image: string;

  @OneToMany(() => CinemaMovieEntity, (cinemaMovie) => cinemaMovie.cinema)
  cinemas: CinemaMovieEntity[];

  @OneToMany(() => ShowTimeEntity, (showTime) => showTime.cinema)
  showTimes: ShowTimeEntity[];

  @ManyToOne(() => CineplexEntity, (cineplex) => cineplex.cinemas)
  cineplex: CineplexEntity;
}
