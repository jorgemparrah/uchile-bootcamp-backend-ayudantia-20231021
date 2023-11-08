import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { UsuarioMapper } from './mapper/Usuario.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    const existente: Usuario = await this.usuarioModel.findOne({
        nombre: createUsuarioDto.nombre
    });
    if (existente) {
      throw Error("Ya existe un usuario con ese nombre");
    }
    const schema : Usuario = UsuarioMapper.toSchema(createUsuarioDto);
    const resultado: Usuario = await this.usuarioModel.create(schema);
    return UsuarioMapper.toDto(resultado);
  }

  async findAll(): Promise<UsuarioDto[]> {
    const resultado: Usuario[] = await this.usuarioModel.find();
    return UsuarioMapper.toDtoList(resultado);
  }

  async findOne(nombre: string): Promise<UsuarioDto> {
    const resultado: Usuario = await this.usuarioModel.findOne({
      nombre: nombre
    });
    if (!resultado) {
      throw Error("No se encontró el usuario");
    }
    return UsuarioMapper.toDto(resultado);
  }

  async update(nombre: string, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDto> {
    const encontrado: Usuario = await this.usuarioModel.findOne({
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

    const resultado: any = await this.usuarioModel.updateOne({
      nombre: nombre
    }, encontrado);
    console.log(resultado);

    const usuarioActualizado: Usuario = await this.usuarioModel.findOne({
      nombre: nombre
    });
    return UsuarioMapper.toDto(usuarioActualizado);
  }

  async remove(nombre: string): Promise<UsuarioDto> {
    const encontrado: Usuario = await this.usuarioModel.findOne({
      nombre: nombre
    });
    if (!encontrado) {
      throw Error("No se encontró el usuario");
    }
    await this.usuarioModel.deleteOne({
      nombre: nombre
    });
    return UsuarioMapper.toDto(encontrado);
  }
}
