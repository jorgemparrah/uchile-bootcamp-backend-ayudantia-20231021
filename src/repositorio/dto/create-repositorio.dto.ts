import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class CreateRepositorioDto {

  @ApiProperty({ description: 'Id del repositorio', example: '1' })
  id: string;

  @ApiProperty({ description: 'Ruta del repositorio', example: 'https://git-prueba.com/repositorio1.git' })
  ruta: string;

  @ApiProperty({ description: 'Descripción del repositorio', example: 'Repositorio de prueba' })
  descripcion: string;

  @ApiProperty({ description: 'Indica si el repositorio es público', example: true })
  @IsBoolean()
  publico: boolean;

  @ApiProperty({ description: 'Id del proyecto al que pertenece el repositorio', example: '1' })
  idProyecto: string;

}
