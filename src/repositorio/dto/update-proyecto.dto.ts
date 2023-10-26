import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsOptional } from "class-validator";

export class UpdateProyectoDto {

  @ApiProperty({ example: "Proyecto X", description: "Nombre del Proyecto" })
  @IsAlphanumeric()
  @IsOptional()
  nombre: string;

}
