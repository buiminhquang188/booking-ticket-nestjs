import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerController } from "./logger.controller";
import { SysLogEntity } from "./logger.entity";
import { LoggerService } from "./logger.service";

@Module({
  imports: [TypeOrmModule.forFeature([SysLogEntity])],
  providers: [LoggerService],
  controllers: [LoggerController],
  exports: [LoggerService],
})
export class LoggerModule {}
