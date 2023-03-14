import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CinemaEntity } from "./../../entity/cinema.entity";
import { CineplexEntity } from "./../../entity/cineplex.entity";
import { CineplexModule } from "./../cineplex/cineplex.module";
import { CinemaController } from "./cinema.controller";
import { CinemaService } from "./cinema.service";

@Module({
  imports: [
    forwardRef(() => CineplexModule),
    TypeOrmModule.forFeature([CinemaEntity, CineplexEntity]),
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
  exports: [CinemaService],
})
export class CinemaModule {}
