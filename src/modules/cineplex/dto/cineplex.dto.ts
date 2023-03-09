import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import type { CineplexEntity } from "../../../entity/cineplex.entity";
import { AbstractDto } from "./../../../common/dto/abstract.dto";

export type CineplexDtoOptions = Partial<{ isActive: boolean }>;

export class CineplexDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(cineplex: CineplexEntity, options?: CineplexDtoOptions) {
    super(cineplex);
    this.name = cineplex.name;
    this.logo = cineplex.logo;
    this.isActive = options?.isActive;
  }
}
