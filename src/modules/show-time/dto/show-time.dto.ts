import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "./../../../common/dto/abstract.dto";
import type { ShowTimeEntity } from "./../../../entity/show-time.entity";

export type ShowTimeDtoOptions = Partial<{ isActive: boolean }>;

export class ShowTimeDto extends AbstractDto {
  @ApiProperty()
  startTime: Date;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(showTime: ShowTimeEntity, options?: ShowTimeDtoOptions) {
    super(showTime);

    this.startTime = showTime.startTime;
    this.isActive = options?.isActive;
  }
}
