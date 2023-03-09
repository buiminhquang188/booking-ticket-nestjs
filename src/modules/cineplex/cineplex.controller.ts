import {
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

import { ApiPageOkResponse, Auth } from "../../decorators";
import { TranslationService } from "../../shared/services/translation.service";
import { PageDto } from "./../../common/dto/page.dto";
import { RoleType } from "./../../constants/role-type";
import { CineplexService } from "./cineplex.service";
import { CineplexDto } from "./dto/cineplex.dto";
import { CineplexesPageOptionsDto } from "./dto/cineplex-page-option.dto";

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
  ) {
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
  getCineplex() {
    return "ok";
  }

  @Post(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  createCineplex() {
    return "ok";
  }

  @Patch(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  updateCineplex() {
    return "ok";
  }

  @Delete(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  deleteCineplex() {
    return "ok";
  }
}
