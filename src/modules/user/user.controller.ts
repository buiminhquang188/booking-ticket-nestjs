import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PageDto } from "../../common/dto/page.dto";
import { RoleType } from "../../constants";
import {
  ApiFile,
  ApiPageOkResponse,
  Auth,
  AuthUser,
  UUIDParam,
} from "../../decorators";
import { UserEntity } from "../../entity/user.entity";
import { UseLanguageInterceptor } from "../../interceptors/language-interceptor.service";
import { TranslationService } from "../../shared/services/translation.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserDto } from "./dtos/user.dto";
import { UsersPageOptionsDto } from "./dtos/users-page-options.dto";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("users")
export class UserController {
  constructor(
    private userService: UserService,
    private readonly translationService: TranslationService
  ) {}

  @Get("admin")
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @UseLanguageInterceptor()
  async admin(@AuthUser() user: UserEntity) {
    const translation = await this.translationService.translate(
      "admin.keywords.admin"
    );

    return {
      text: `${translation} ${user.firstName}`,
    };
  }

  @Get()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get users list",
    type: PageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto
  ): Promise<PageDto<UserDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get users list",
    type: UserDto,
  })
  getUser(@UUIDParam("id") userId: Uuid): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @Post()
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Create user",
    type: CreateUserDto,
  })
  @ApiFile({ name: "avatar" })
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(":id")
  @Auth([RoleType.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: "id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update user",
    type: UpdateUserDto,
  })
  @ApiFile({ name: "avatar" })
  updateUser(
    @UUIDParam("id") userId: Uuid,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
