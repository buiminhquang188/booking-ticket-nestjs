import type { CinemaDtoOptions } from "modules/cinema/dto/cinema.dto";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import { UseDto } from "../decorators";
import { CinemaDto } from "../modules/cinema/dto/cinema.dto";
import type { IAbstractEntity } from "./../common/abstract.entity";
import { AbstractEntity } from "./../common/abstract.entity";
import { CinemaMovieEntity } from "./cinema-movie.entity";
import { CineplexEntity } from "./cineplex.entity";
import { ShowTimeEntity } from "./show-time.entity";

export interface ICinemaEntity extends IAbstractEntity<CinemaDto> {
  name: string;

  address: string;

  image: string;
}

@Entity({ name: "cinemas" })
@UseDto(CinemaDto)
export class CinemaEntity
  extends AbstractEntity<CinemaDto, CinemaDtoOptions>
  implements ICinemaEntity
{
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
