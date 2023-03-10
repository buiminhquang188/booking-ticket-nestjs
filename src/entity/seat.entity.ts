import { Column, Entity, ManyToOne } from "typeorm";

import type { IAbstractEntity } from "../common/abstract.entity";
import { AbstractEntity } from "../common/abstract.entity";
import { UseDto } from "../decorators";
import type { SeatDtoOptions } from "./../modules/seat/dto/seat.dto";
import { SeatDto } from "./../modules/seat/dto/seat.dto";
import { ShowTimeEntity } from "./show-time.entity";

export interface ISeatEntity extends IAbstractEntity<SeatDto> {
  name: string;

  status: boolean;

  price: number;

  type: string;
}

@Entity({ name: "seat" })
@UseDto(SeatDto)
export class SeatEntity
  extends AbstractEntity<SeatDto, SeatDtoOptions>
  implements ISeatEntity
{
  @Column({ type: "varchar", length: 20, nullable: false })
  name: string;

  @Column({ type: "boolean", nullable: false })
  status: boolean;

  @Column({ type: "smallint", nullable: false })
  price: number;

  @Column({ type: "char", length: 6, nullable: false })
  type: string;

  @ManyToOne(() => ShowTimeEntity, (showTime) => showTime.seats)
  showTime: ShowTimeEntity;
}
