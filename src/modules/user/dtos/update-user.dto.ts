import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Column } from "typeorm";

import { Trim } from "../../../decorators/transform.decorators";
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  readonly firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  readonly lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Column()
  @IsPhoneNumber("VN")
  phone?: string;
}
