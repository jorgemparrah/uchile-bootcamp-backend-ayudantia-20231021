import { ApiProperty } from "@nestjs/swagger";
import { RepositorioDto } from "./repositorio.dto";

export class ProyectoDto {

  @ApiProperty({ example: "Identificador", description: "Id del Proyecto" })
  id: string;

  @ApiProperty({ example: "Proyecto X", description: "Nombre del Proyecto" })
  nombre: string;

  @ApiProperty({ description: "Lista de repositorios del proyecto" })
  repositorios: RepositorioDto[];

}
