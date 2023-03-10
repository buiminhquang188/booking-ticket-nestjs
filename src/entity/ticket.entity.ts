import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { MovieEntity } from "./movie.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "ticket" })
export class TicketEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.tickets)
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movie) => movie.tickets)
  movie: MovieEntity;
}
