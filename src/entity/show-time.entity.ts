import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

import type { IAbstractEntity } from "../common/abstract.entity";
import { AbstractEntity } from "../common/abstract.entity";
import { UseDto } from "../decorators";
import type { ShowTimeDtoOptions } from "./../modules/show-time/dto/show-time.dto";
import { ShowTimeDto } from "./../modules/show-time/dto/show-time.dto";
import { CinemaEntity } from "./cinema.entity";
import { SeatEntity } from "./seat.entity";

export interface IShowTimeEntity extends IAbstractEntity<ShowTimeDto> {
  startTime: Date;
}

@Entity({ name: "show_time" })
@UseDto(ShowTimeDto)
export class ShowTimeEntity
  extends AbstractEntity<ShowTimeDto, ShowTimeDtoOptions>
  implements IShowTimeEntity
{
  @Column({ type: "date", nullable: false })
  startTime: Date;

  @ManyToOne(() => CinemaEntity, (cinema) => cinema.cinemas)
  cinema: CinemaEntity;

  @OneToMany(() => SeatEntity, (seat) => seat.showTime)
  seats: SeatEntity[];
}
