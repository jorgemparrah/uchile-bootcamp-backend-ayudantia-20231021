import { ObjectId } from "mongodb";
import { CreateRepositorioDto } from "../dto/create-repositorio.dto";
import { RepositorioDto } from "../dto/repositorio.dto";
import { Repositorio } from "../schemas/repositorio.schema";
import { ProyectoMapper } from "./proyecto.mapper";

export class RepositorioMapper {

  static toSchema(dto: CreateRepositorioDto) : Repositorio {
    const entidad : Repositorio = new Repositorio();
    entidad.id = dto.id;
    entidad.descripcion = dto.descripcion;
    entidad.ruta = dto.ruta;
    entidad.publico = dto.publico;
    entidad.idProyecto = new ObjectId(dto.idProyecto);
    return entidad;
  }

  static toDto(entidad: Repositorio): RepositorioDto {
    const dto = new RepositorioDto();
    dto.id = entidad.id;
    dto.descripcion = entidad.descripcion;
    dto.ruta = entidad.ruta;
    dto.publico = entidad.publico;
    dto.idProyecto = entidad.idProyecto.toString();
    if (entidad.proyecto) {
      dto.proyecto = ProyectoMapper.toDto(entidad.proyecto);
    }
    return dto;
  }

  static toDtoList(entidades: Repositorio[]): RepositorioDto[] {
    return entidades.map(entidad => this.toDto(entidad));
  }

}