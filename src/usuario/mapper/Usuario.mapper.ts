import { CreateUsuarioDto } from "../dto/create-usuario.dto";
import { UsuarioDto } from "../dto/usuario.dto";
import { Usuario } from "../schemas/usuario.schema";

export class UsuarioMapper {

  static toDto(entidad: Usuario): UsuarioDto {
    const dto = new UsuarioDto();
    dto.nombre = entidad.nombre;
    dto.correo = entidad.correo;
    dto.nombreMostrar = entidad.nombreMostrar;
    return dto;
  }

  static toDtoList(entidades: Usuario[]): UsuarioDto[] {
    return entidades.map((entidad) => this.toDto(entidad));
  }

  static toSchema(dto: CreateUsuarioDto): Usuario {
    const entidad = new Usuario();
    entidad.nombre = dto.nombre;
    entidad.correo = dto.correo;
    entidad.nombreMostrar = dto.nombreMostrar;
    entidad.clave = dto.clave;
    return entidad;
  }

}