import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CinemaEntity } from "./cinema.entity";

@Entity()
export class CineplexEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  logo: string;

  @OneToMany(() => CinemaEntity, (cinema) => cinema.cineplex)
  cinemas: CinemaEntity[];
}
