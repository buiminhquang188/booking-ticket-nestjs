import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { CineplexEntity } from "entity/cineplex.entity";

import { ApiPageOkResponse, Auth, UUIDParam } from "../../decorators";
import { TranslationService } from "../../shared/services/translation.service";
import { PageDto } from "./../../common/dto/page.dto";
import { RoleType } from "./../../constants/role-type";
import { CineplexService } from "./cineplex.service";
import { CineplexDto } from "./dto/cineplex.dto";
import { CineplexesPageOptionsDto } from "./dto/cineplex-page-option.dto";
import { CreateCineplexDto } from "./dto/create-cineplex.dto";
import { UpdateCineplexDto } from "./dto/update-cineplex.dto";

@Controller("cineplex")
@ApiTags("cineplex")
export class CineplexController {
  constructor(
    private cineplexService: CineplexService,
    private readonly translationService: TranslationService
  ) {}

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get users list",
    type: PageDto,
  })
  getCineplexes(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CineplexesPageOptionsDto
  ): Promise<PageDto<CineplexDto>> {
    return this.cineplexService.getCineplexes(pageOptionsDto);
  }

  @Get(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get users list",
    type: CineplexDto,
  })
  getCineplex(@UUIDParam("id") cineplexId: Uuid): Promise<CineplexDto> {
    return this.cineplexService.getCineplex(cineplexId);
  }

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Create cineplex",
    type: CreateCineplexDto,
  })
  createCineplex(
    @Body() createCineplexDto: CreateCineplexDto
  ): Promise<CineplexEntity> {
    return this.cineplexService.createCineplex(createCineplexDto);
  }

  @Patch(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update cineplex",
    type: CineplexDto,
  })
  updateCineplex(
    @UUIDParam("id") cineplexId: Uuid,
    @Body() updateCineplextDto: UpdateCineplexDto
  ): Promise<CineplexEntity> {
    return this.cineplexService.updateCineplex(cineplexId, updateCineplextDto);
  }

  @Delete(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete cineplex",
    type: CineplexDto,
  })
  deleteCineplex(@UUIDParam("id") cineplexId: Uuid): Promise<CineplexEntity> {
    return this.cineplexService.deleteCineplex(cineplexId);
  }
}
