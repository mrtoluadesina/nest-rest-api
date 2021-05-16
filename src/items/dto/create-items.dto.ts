import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateItemDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(10)
  readonly name: string;
  @ApiProperty({required: false})
  readonly description : string;
  @ApiProperty()
  readonly qty: number;
}