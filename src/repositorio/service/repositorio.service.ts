import { Injectable } from '@nestjs/common';
import { CreateRepositorioDto } from '../dto/create-repositorio.dto';
import { UpdateRepositorioDto } from '../dto/update-repositorio.dto';
import { RepositorioDto } from '../dto/repositorio.dto';
import { RepositorioMapper } from '../mapper/repositorio.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from '../schemas/proyecto.schema';
import { Repositorio } from '../schemas/repositorio.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class RepositorioService {

  constructor(
    @InjectModel(Proyecto.name)
    private proyectoModel: Model<Proyecto>,
    @InjectModel(Repositorio.name)
    private repositorioModel: Model<Repositorio>
  ) {}

  async create(createRepositorioDto: CreateRepositorioDto): Promise<RepositorioDto> {
    const existente : Repositorio = await this.repositorioModel.findOne({
      id: createRepositorioDto.id
    });
    if (existente) {
      throw Error("Ya existe un repositorio con ese id");
    }
    if (createRepositorioDto.idProyecto) {
      const proyectoExistente : Proyecto = await this.proyectoModel.findOne({
        _id: new ObjectId(createRepositorioDto.idProyecto)
      });
      console.log(proyectoExistente);
      if (!proyectoExistente) {
        throw Error("No existe el proyecto");
      }
    }

    const entidad : Repositorio = RepositorioMapper.toSchema(createRepositorioDto);
    const resultado : Repositorio = await this.repositorioModel.create(entidad);
    return RepositorioMapper.toDto(resultado);
  }

  async findAll(): Promise<RepositorioDto[]> {
    const resultado : Repositorio[] = await this.repositorioModel.find();
    return RepositorioMapper.toDtoList(resultado);
  }

  async findOne(id: string): Promise<RepositorioDto> {
    const resultado : Repositorio = await this.repositorioModel.findOne({
      id: id
    });
    console.log(resultado);
    if (!resultado) {
      throw Error("No se encontró el repositorio");
    }
    return RepositorioMapper.toDto(resultado);
  }

  async update(id: string, updateRepositorioDto: UpdateRepositorioDto): Promise<RepositorioDto> {
    const encontrado: Repositorio = await this.repositorioModel.findOne({
      id: id
    });
    if (!encontrado) {
      throw Error("No se encontró el repositorio");
    }
    if (updateRepositorioDto.descripcion) {
      encontrado.descripcion = updateRepositorioDto.descripcion;
    }
    if (updateRepositorioDto.idProyecto) {
      encontrado.idProyecto = new ObjectId(updateRepositorioDto.idProyecto);
    }
    if (updateRepositorioDto.publico) {
      encontrado.publico = updateRepositorioDto.publico;
    }
    if (updateRepositorioDto.ruta) {
      encontrado.ruta = updateRepositorioDto.ruta;
    }

    const resultado: any = await this.repositorioModel.updateOne({
      id: id
    }, encontrado);
    console.log(resultado);

    const repositorioActualizado: Repositorio = await this.repositorioModel.findOne({
      id: id
    });
    return RepositorioMapper.toDto(repositorioActualizado);
  }

  async remove(id: string): Promise<RepositorioDto> {
    const encontrado: Repositorio = await this.repositorioModel.findOne({
      id: id
    });
    if (!encontrado) {
      throw Error("No se encontró el repositorio");
    }
    await this.repositorioModel.deleteOne({
      id: id
    });
    return RepositorioMapper.toDto(encontrado);
  }
}
