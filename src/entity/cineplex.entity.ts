import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import type { AbstractTranslationEntity } from "../common/abstract.entity";
import { CinemaEntity } from "./cinema.entity";

@Entity()
export class CineplexEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  logo: string;

  @OneToMany(() => CinemaEntity, (cinema) => cinema.cineplex)
  cinemas: CinemaEntity[];

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;

  translations?: AbstractTranslationEntity[];
}
