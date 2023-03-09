import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "./../../../common/dto/abstract.dto";
import type { SeatEntity } from "./../../../entity/seat.entity";

export type SeatDtoOptions = Partial<{ isActive?: boolean }>;

export class SeatDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  price: number;

  @ApiProperty()
  type: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(seat: SeatEntity, options?: SeatDtoOptions) {
    super(seat);

    this.name = seat.name;
    this.status = seat.status;
    this.price = seat.price;
    this.type = seat.type;
    this.isActive = options?.isActive;
  }
}
