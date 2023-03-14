import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CineplexEntity } from "../../entity/cineplex.entity";
import { CinemaModule } from "../../modules/cinema/cinema.module";
import { CinemaEntity } from "./../../entity/cinema.entity";
import { CineplexController } from "./cineplex.controller";
import { CineplexService } from "./cineplex.service";

@Module({
  imports: [
    forwardRef(() => CinemaModule),
    TypeOrmModule.forFeature([CineplexEntity, CinemaEntity]),
  ],
  controllers: [CineplexController],
  providers: [CineplexService],
  exports: [CineplexService],
})
export class CineplexModule {}
