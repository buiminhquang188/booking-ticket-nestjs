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
import {
  ApiAcceptedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { ApiPageOkResponse, UUIDParam } from "../../decorators";
import { PageDto } from "./../../common/dto/page.dto";
import { TranslationService } from "./../../shared/services/translation.service";
import { CinemaService } from "./cinema.service";
import { CinemaDto } from "./dto/cinema.dto";
import { CinemaPageOptionsDto } from "./dto/cinema-page-option.dto";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";

@Controller("cinema")
@ApiTags("Cinema")
export class CinemaController {
  constructor(
    private cinemaService: CinemaService,
    private readonly translationService: TranslationService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get cinemas list",
    type: PageDto,
  })
  getCinemas(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CinemaPageOptionsDto
  ) {
    return this.cinemaService.getCinemas(pageOptionsDto);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    description: "Get cinema detail",
    type: CinemaDto,
  })
  getCinema(@UUIDParam("id") cinemaId: Uuid) {
    return this.cinemaService.getCinema(cinemaId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: "Create cinema",
    type: CreateCinemaDto,
  })
  createCinema(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.createCinema(createCinemaDto);
  }

  @Patch("id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiParam({ name: "id" })
  @ApiResponse({
    description: "Update cinema",
    type: UpdateCinemaDto,
  })
  updateCinema(
    @UUIDParam("id") cinemaId: Uuid,
    @Body() updateCinemaDto: UpdateCinemaDto
  ) {
    return this.cinemaService.updateCinema(cinemaId, updateCinemaDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiParam({ name: "id" })
  @ApiAcceptedResponse()
  deleteCinema(@UUIDParam("id") cinemaId: Uuid) {
    return this.cinemaService.deleteCinema(cinemaId);
  }
}
