import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { MovieEntity } from "./movie.entity";
import { UserEntity } from "./user.entity";

@Entity()
export class TicketEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @Column({ type: "int", nullable: false })
  userId: number;

  @OneToOne(() => MovieEntity, (movie) => movie.id)
  @Column({ type: "int", nullable: false })
  movieId: number;
}
