import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MongoEntityManager, MongoRepository, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioMapper } from './mapper/Usuario.mapper';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(Usuario)
    private usuarioRepository: MongoRepository<Usuario>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    const em : MongoEntityManager = this.dataSource.mongoManager;
    const repoUsuario = em.getMongoRepository(Usuario);
    const cantidad: number = await repoUsuario.countBy({
      nombre: createUsuarioDto.nombre
    });
    if (cantidad > 0) {
      throw Error("Ya existe un usuario con ese nombre");
    }
    const entidad : Usuario = UsuarioMapper.toEntity(createUsuarioDto);
    const resultado: Usuario = await repoUsuario.save(entidad);
    return UsuarioMapper.toDto(resultado);
  }

  async findAll(): Promise<UsuarioDto[]> {
    const resultado: Usuario[] = await this.usuarioRepository.find();
    return UsuarioMapper.toDtoList(resultado);
  }

  async findOne(nombre: string): Promise<UsuarioDto> {
    const cantidad: number = await this.usuarioRepository.countBy({
      nombre: nombre
    });
    if (cantidad == 0) {
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
    const encontrado: Usuario = await this.usuarioRepository.findOneBy({
      nombre: nombre
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
    await this.usuarioRepository.deleteOne({
      nombre: nombre
    });
    return UsuarioMapper.toDto(encontrado);
  }
}
