import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import type { PageDto } from "../../common/dto/page.dto";
import { ValidatorService } from "../../shared/services/validator.service";
import { CinemaEntity } from "./../../entity/cinema.entity";
import type { CinemaDto } from "./dto/cinema.dto";
import type { CinemaPageOptionsDto } from "./dto/cinema-page-option.dto";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(CinemaEntity)
    private cinemaEntity: Repository<CinemaEntity>,
    private validatorService: ValidatorService
  ) {}

  async getCinemas(
    pageOptionsDto: CinemaPageOptionsDto
  ): Promise<PageDto<CinemaDto>> {
    const queryBuilder = this.cinemaEntity.createQueryBuilder("cinema");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getCinema(cinemaId: Uuid): Promise<CinemaEntity> {
    const queryBuilder = this.cinemaEntity.createQueryBuilder("cinema");

    queryBuilder.where("cinema.id = :cinemaId", { cinemaId });

    const cinemaEntity = await queryBuilder.getOne();

    if (!cinemaEntity) {
      throw new NotFoundException();
    }

    return cinemaEntity;
  }

  @Transactional()
  async createCinema(createCinemaDto: CreateCinemaDto): Promise<CinemaEntity> {
    const cinema = this.cinemaEntity.create(createCinemaDto);

    await this.cinemaEntity.save(cinema);

    return cinema;
  }

  @Transactional()
  async updateCinema(
    cinemaId: Uuid,
    updateCinemaDto: UpdateCinemaDto
  ): Promise<CinemaEntity> {
    const cinema = await this.getCinema(cinemaId);

    return this.cinemaEntity.merge(cinema, updateCinemaDto);
  }

  @Transactional()
  async deleteCinema(cinemaId: Uuid): Promise<CinemaEntity> {
    const cinemaEntity = await this.getCinema(cinemaId);

    return this.cinemaEntity.remove(cinemaEntity);
  }
}
