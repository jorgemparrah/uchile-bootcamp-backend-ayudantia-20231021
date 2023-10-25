import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioMapper } from './mapper/Usuario.mapper';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    const existe: boolean = await this.usuarioRepository.exist({
      where: {
        nombre: createUsuarioDto.nombre
      }
    });
    if (existe) {
      throw Error("Ya existe un usuario con ese nombre");
    }
    const entidad : Usuario = UsuarioMapper.toEntity(createUsuarioDto);
    const resultado: Usuario = await this.usuarioRepository.save(entidad);
    return UsuarioMapper.toDto(resultado);
  }

  async findAll(): Promise<UsuarioDto[]> {
    const resultado: Usuario[] = await this.usuarioRepository.find();
    return UsuarioMapper.toDtoList(resultado);
  }

  async findOne(nombre: string): Promise<UsuarioDto> {
    const existe: boolean = await this.usuarioRepository.exist({
      where: {
        nombre: nombre
      }
    });
    if (!existe) {
      throw Error("No se encontró el usuario");
    }
    const resultado: Usuario = await this.usuarioRepository.findOne({
      where: {
        nombre: nombre
      }
    });
    return UsuarioMapper.toDto(resultado);
  }

  async update(nombre: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDto> {
    const encontrado: Usuario = await this.usuarioRepository.findOne({
      where: {
        nombre: nombre
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el usuario");
    }
    if (updateUsuarioDto.correo) {
      encontrado.correo = updateUsuarioDto.correo;
    }
    if (updateUsuarioDto.nombreMostrar) {
      encontrado.nombreMostrar = updateUsuarioDto.nombreMostrar;
    }
    if (updateUsuarioDto.clave) {
      encontrado.clave = updateUsuarioDto.clave;
    }

    const resultado: Usuario = await this.usuarioRepository.save(encontrado);
    return UsuarioMapper.toDto(resultado);
  }

  async remove(nombre: string): Promise<UsuarioDto> {
    const encontrado: Usuario = await this.usuarioRepository.findOne({
      where: {
        nombre: nombre
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el usuario");
    }
    await this.usuarioRepository.remove(encontrado);
    return UsuarioMapper.toDto(encontrado);
  }
}
