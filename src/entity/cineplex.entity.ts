import { Column, Entity, OneToMany } from "typeorm";

import type { IAbstractEntity } from "../common/abstract.entity";
import { AbstractEntity } from "../common/abstract.entity";
import { UseDto } from "../decorators/use-dto.decorator";
import type { CineplexDtoOptions } from "./../modules/cineplex/dto/cineplex.dto";
import { CineplexDto } from "./../modules/cineplex/dto/cineplex.dto";
import { CinemaEntity } from "./cinema.entity";

export interface ICineplexEntity extends IAbstractEntity<CineplexDto> {
  name?: string;

  logo?: string;
}

@Entity({ name: "cineplex" })
@UseDto(CineplexDto)
export class CineplexEntity
  extends AbstractEntity<CineplexDto, CineplexDtoOptions>
  implements ICineplexEntity
{
  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  logo: string;

  @OneToMany(() => CinemaEntity, (cinema) => cinema.cineplex)
  cinemas: CinemaEntity[];
}
