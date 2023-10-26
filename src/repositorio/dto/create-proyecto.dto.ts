import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumberString } from "class-validator";

export class CreateProyectoDto {

  @ApiProperty({ example: "Identificador", description: "Id del Proyecto" })
  @IsNumberString()
  id: string;

  @ApiProperty({ example: "Proyecto X", description: "Nombre del Proyecto" })
  @IsAlphanumeric()
  nombre: string;

}
