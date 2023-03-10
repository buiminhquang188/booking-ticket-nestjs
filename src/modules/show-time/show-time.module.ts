import { Module } from '@nestjs/common';
import { ShowTimeController } from './show-time.controller';
import { ShowTimeService } from './show-time.service';

@Module({
  controllers: [ShowTimeController],
  providers: [ShowTimeService]
})
export class ShowTimeModule {}
