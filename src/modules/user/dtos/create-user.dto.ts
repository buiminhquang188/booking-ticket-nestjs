import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

import { UserRegisterDto } from "../../../modules/auth/dto/UserRegisterDto";
import { RoleType } from "./../../../constants/role-type";

export class CreateUserDto extends UserRegisterDto {
  @IsEnum(RoleType)
  @ApiProperty({
    description: "description of the severity property",
    enum: RoleType,
  })
  role: RoleType;
}
