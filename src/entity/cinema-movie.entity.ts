import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CinemaEntity } from "./cinema.entity";
import { MovieEntity } from "./movie.entity";

@Entity()
export class CinemaMovieEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => CinemaEntity, (cinema) => cinema.cinemas)
  cinema: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.cinemaMovies)
  movie: number;
}
