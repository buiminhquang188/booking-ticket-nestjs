import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ShowTimeEntity } from "./show-time.entity";

@Entity()
export class SeatEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

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
