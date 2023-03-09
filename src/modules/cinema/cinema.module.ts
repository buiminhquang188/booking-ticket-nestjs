import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';

@Module({
  providers: [CinemaService],
  controllers: [CinemaController]
})
export class CinemaModule {}
