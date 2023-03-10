import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CineplexEntity } from "../../entity/cineplex.entity";
import { CineplexController } from "./cineplex.controller";
import { CineplexService } from "./cineplex.service";

@Module({
  imports: [TypeOrmModule.forFeature([CineplexEntity])],
  controllers: [CineplexController],
  providers: [CineplexService],
})
export class CineplexModule {}
