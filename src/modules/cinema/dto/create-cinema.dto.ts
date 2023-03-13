import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateCinemaDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  cineplexId: Uuid;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  address: string;

  @ApiProperty({ maxLength: 50 })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  image?: string;
}
