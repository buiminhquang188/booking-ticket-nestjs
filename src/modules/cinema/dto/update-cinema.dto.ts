import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateCinemaDto {
  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  address: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  logo?: string;
}
