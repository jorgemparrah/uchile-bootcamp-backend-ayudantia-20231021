import { ApiProperty } from "@nestjs/swagger";
import { ProyectoDto } from "./proyecto.dto";

export class RepositorioDto {

  @ApiProperty({ description: 'Id del repositorio', example: '1' })
  id: string;

  @ApiProperty({ description: 'Ruta del repositorio', example: 'https://git-prueba.com/repositorio1.git' })
  ruta: string;

  @ApiProperty({ description: 'Descripción del repositorio', example: 'Repositorio de prueba' })
  descripcion: string;

  @ApiProperty({ description: 'Indica si el repositorio es público', example: true })
  publico: boolean;

  @ApiProperty({ description: 'Id del proyecto al que pertenece el repositorio', example: '1' })
  idProyecto: string;

  @ApiProperty({ description: 'Proyecto al que pertenece el repositorio' })
  proyecto: ProyectoDto;

}
