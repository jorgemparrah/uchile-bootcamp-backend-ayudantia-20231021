import { CreateProyectoDto } from "../dto/create-proyecto.dto";
import { ProyectoDto } from "../dto/proyecto.dto";
import { Proyecto } from "../entities/proyecto.entity";
import { RepositorioMapper } from "./repositorio.mapper";

export class ProyectoMapper {

  static toEntity(dto: CreateProyectoDto) : Proyecto {
    const entidad : Proyecto = new Proyecto();
    entidad.idProyecto = dto.id;
    entidad.nombre = dto.nombre;
    return entidad;
  }

  static toDto(entidad: Proyecto): ProyectoDto {
    const dto = new ProyectoDto();
    dto.id = entidad.idProyecto;
    dto.nombre = entidad.nombre;
    return dto;
  }

  static toDtoList(entidades: Proyecto[]): ProyectoDto[] {
    return entidades.map(entidad => this.toDto(entidad));
  }

}