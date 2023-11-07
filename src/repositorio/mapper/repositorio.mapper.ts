import { CreateRepositorioDto } from "../dto/create-repositorio.dto";
import { RepositorioDto } from "../dto/repositorio.dto";
import { Repositorio } from "../entities/repositorio.entity";
import { ProyectoMapper } from "./proyecto.mapper";

export class RepositorioMapper {

  static toEntity(dto: CreateRepositorioDto) : Repositorio {
    const entidad : Repositorio = new Repositorio();
    entidad.idRepositorio = dto.id;
    entidad.descripcion = dto.descripcion;
    entidad.ruta = dto.ruta;
    entidad.publico = dto.publico;
    entidad.idProyecto = dto.idProyecto;
    return entidad;
  }

  static toDto(entidad: Repositorio): RepositorioDto {
    const dto = new RepositorioDto();
    dto.id = entidad.idRepositorio;
    dto.descripcion = entidad.descripcion;
    dto.ruta = entidad.ruta;
    dto.publico = entidad.publico;
    dto.idProyecto = entidad.idProyecto;
    return dto;
  }

  static toDtoList(entidades: Repositorio[]): RepositorioDto[] {
    return entidades.map(entidad => this.toDto(entidad));
  }

}