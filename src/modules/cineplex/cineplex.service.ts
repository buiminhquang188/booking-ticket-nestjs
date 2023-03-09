import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CineplexEntity } from "./../../entity/cineplex.entity";
import { ValidatorService } from "./../../shared/services/validator.service";
import type { CineplexesPageOptionsDto } from "./dto/cineplex-page-option.dto";

@Injectable()
export class CineplexService {
  constructor(
    @InjectRepository(CineplexEntity)
    private cineplexRepository: Repository<CineplexEntity>,
    private validatorService: ValidatorService
  ) {}

  async getCineplexes(pageOptionsDto: CineplexesPageOptionsDto) {
    const queryBuilder = this.cineplexRepository.createQueryBuilder("cineplex");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
}
