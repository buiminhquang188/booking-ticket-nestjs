import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import type { CinemaEntity } from "entity/cinema.entity";

import { AbstractDto } from "./../../../common/dto/abstract.dto";

export type CinemaDtoOptions = Partial<{ isActive: boolean }>;

export class CinemaDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  image: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(cinema: CinemaEntity, options?: CinemaDtoOptions) {
    super(cinema);
    this.name = cinema.name;
    this.address = cinema.address;
    this.image = cinema.address;
    this.isActive = options?.isActive;
  }
}
