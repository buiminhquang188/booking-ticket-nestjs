import { Column, Entity, OneToMany } from "typeorm";

import type { IAbstractEntity } from "../common/abstract.entity";
import { AbstractEntity } from "../common/abstract.entity";
import { UseDto } from "../decorators";
import type { MovieDtoOptions } from "./../modules/movie/dto/movie.dto";
import { MovieDto } from "./../modules/movie/dto/movie.dto";
import { CinemaMovieEntity } from "./cinema-movie.entity";
import { TicketEntity } from "./ticket.entity";

export interface IMovieEntity extends IAbstractEntity<MovieDto> {
  movieName: string;

  startDate: Date;

  time: number;

  evaluate: number;

  poster: string;

  trailer: string;
}

@Entity({ name: "movie" })
@UseDto(MovieDto)
export class MovieEntity
  extends AbstractEntity<MovieDto, MovieDtoOptions>
  implements IMovieEntity
{
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
