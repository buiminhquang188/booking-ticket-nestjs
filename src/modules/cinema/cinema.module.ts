import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CinemaEntity } from "./../../entity/cinema.entity";
import { CinemaController } from "./cinema.controller";
import { CinemaService } from "./cinema.service";

@Module({
  imports: [TypeOrmModule.forFeature([CinemaEntity])],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
