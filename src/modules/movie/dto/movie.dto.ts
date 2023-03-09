import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { AbstractDto } from "./../../../common/dto/abstract.dto";
import type { MovieEntity } from "./../../../entity/movie.entity";

export type MovieDtoOptions = Partial<{ isActive: boolean }>;

export class MovieDto extends AbstractDto {
  @ApiProperty()
  movieName: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  time: number;

  @ApiProperty()
  evaluate: number;

  @ApiProperty()
  poster: string;

  @ApiProperty()
  trailer: string;

  @ApiPropertyOptional()
  isActive?: boolean;

  constructor(movie: MovieEntity, options?: MovieDtoOptions) {
    super(movie);
    this.movieName = movie.movieName;
    this.startDate = movie.startDate;
    this.time = movie.time;
    this.evaluate = movie.evaluate;
    this.poster = movie.poster;
    this.trailer = movie.trailer;
    this.isActive = options?.isActive;
  }
}
