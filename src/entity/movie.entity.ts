import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CinemaMovieEntity } from "./cinema-movie.entity";
import { TicketEntity } from "./ticket.entity";

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  movieName: string;

  @Column({ type: "date", nullable: false })
  startDate: Date;

  @Column({ type: "int", nullable: false })
  time: number;

  @Column({ type: "int", nullable: false })
  evaluate: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  poster: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  trailer: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.movie)
  tickets: TicketEntity[];

  @OneToMany(() => CinemaMovieEntity, (cinemaMovie) => cinemaMovie.movie)
  cinemaMovies: MovieEntity[];
}
