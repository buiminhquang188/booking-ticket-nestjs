import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import type { PageDto } from "../../common/dto/page.dto";
import { CinemaEntity } from "../../entity/cinema.entity";
import { CineplexEntity } from "./../../entity/cineplex.entity";
import { ValidatorService } from "./../../shared/services/validator.service";
import { CinemaService } from "./../cinema/cinema.service";
import type { CineplexDto } from "./dto/cineplex.dto";
import type { CineplexesPageOptionsDto } from "./dto/cineplex-page-option.dto";
import { CreateCineplexDto } from "./dto/create-cineplex.dto";
import { UpdateCineplexDto } from "./dto/update-cineplex.dto";

@Injectable()
export class CineplexService {
  constructor(
    @InjectRepository(CineplexEntity)
    private cineplexRepository: Repository<CineplexEntity>,
    @InjectRepository(CinemaEntity)
    private cinemaRepository: Repository<CinemaEntity>,
    @Inject(forwardRef(() => CinemaService))
    private cinemaService: CinemaService,
    private validatorService: ValidatorService
  ) {}

  async getCineplexes(
    pageOptionsDto: CineplexesPageOptionsDto
  ): Promise<PageDto<CineplexDto>> {
    const queryBuilder = this.cineplexRepository.createQueryBuilder("cineplex");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getCineplex(cineplexId: Uuid): Promise<CineplexEntity> {
    const queryBuilder = this.cineplexRepository.createQueryBuilder("cineplex");

    queryBuilder.where("cineplex.id = :cineplexId", { cineplexId });

    const cineplexEntity = await queryBuilder.getOne();

    if (!cineplexEntity) {
      throw new NotFoundException();
    }

    return cineplexEntity;
  }

  @Transactional()
  async createCineplex(
    createCineplexDto: CreateCineplexDto
  ): Promise<CineplexEntity> {
    const cineplex = this.cineplexRepository.create(createCineplexDto);

    await this.cineplexRepository.save(cineplex);

    return cineplex;
  }

  @Transactional()
  async updateCineplex(
    cineplexId: Uuid,
    updateCineplexDto: UpdateCineplexDto
  ): Promise<CineplexEntity> {
    const cineplex = await this.getCineplex(cineplexId);

    return this.cineplexRepository.merge(cineplex, updateCineplexDto);
  }

  @Transactional()
  async deleteCineplex(cineplexId: Uuid): Promise<CineplexEntity> {
    const cineplexEntity = await this.getCineplex(cineplexId);

    const preUpdateCinemas = await this.preUpdateCinemaByCineplexId(
      cineplexEntity.id
    );

    if (preUpdateCinemas.length === 0) {
      throw new BadRequestException();
    }

    return this.cineplexRepository.remove(cineplexEntity);
  }

  @Transactional()
  async preUpdateCinemaByCineplexId(cineplexId: Uuid): Promise<CinemaEntity[]> {
    const cinemaEntity = await this.cinemaRepository.find({
      where: {
        cineplex: {
          id: cineplexId,
        } as never,
      },
    });

    if (cinemaEntity.length === 0) {
      throw new NotFoundException();
    }

    const cinemas = cinemaEntity.map((cinema) => ({
      ...cinema,
      cineplex: null as never,
    }));

    return this.cinemaRepository.save(cinemas);
  }
}
