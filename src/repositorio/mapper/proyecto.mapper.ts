import { CreateProyectoDto } from "../dto/create-proyecto.dto";
import { ProyectoDto } from "../dto/proyecto.dto";
import { Proyecto } from "../entities/proyecto.entity";
import { RepositorioMapper } from "./repositorio.mapper";

export class ProyectoMapper {

  static toEntity(dto: CreateProyectoDto) : Proyecto {
    const entidad : Proyecto = new Proyecto();
    entidad.id = dto.id;
    entidad.nombre = dto.nombre;
    return entidad;
  }

  static toDto(entidad: Proyecto): ProyectoDto {
    const dto = new ProyectoDto();
    dto.id = entidad.id;
    dto.nombre = entidad.nombre;
    if (entidad.repositorios) {
      dto.repositorios = RepositorioMapper.toDtoList(entidad.repositorios);
    }
    return dto;
  }

  static toDtoList(entidades: Proyecto[]): ProyectoDto[] {
    return entidades.map(entidad => this.toDto(entidad));
  }

}