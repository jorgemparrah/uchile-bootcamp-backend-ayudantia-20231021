import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { ProyectoDto } from '../dto/proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { ProyectoMapper } from '../mapper/proyecto.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from '../schemas/proyecto.schema';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectModel(Proyecto.name)
    private proyectoModel: Model<Proyecto>
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<ProyectoDto> {
    const existente : Proyecto = await this.proyectoModel.findOne({
      id: createProyectoDto.id
    });
    if (existente) {
      throw Error("Ya existe un proyecto con ese id");
    }
    const entidad : Proyecto = ProyectoMapper.toSchema(createProyectoDto);
    const resultado : Proyecto = await this.proyectoModel.create(entidad);
    return ProyectoMapper.toDto(resultado);
  }

  async findAll(): Promise<ProyectoDto[]> {
    const resultado : Proyecto[] = await this.proyectoModel.find();
    return ProyectoMapper.toDtoList(resultado);
  }

  async findOne(id: string): Promise<ProyectoDto> {
    const resultado : Proyecto = await this.proyectoModel.findOne({
      id: id
    });
    if (!resultado) {
      throw Error("No se encontró el proyecto");
    }
    return ProyectoMapper.toDto(resultado);
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto): Promise<ProyectoDto> {
    const encontrado: Proyecto = await this.proyectoModel.findOne({
      id: id
    });
    if (!encontrado) {
      throw Error("No se encontró el proyecto");
    }
    if (updateProyectoDto.nombre) {
      encontrado.nombre = updateProyectoDto.nombre;
    }

    const resultado: any = await this.proyectoModel.updateOne({
      id: id
    }, encontrado);
    console.log(resultado);

    const proyectoActualizado: Proyecto = await this.proyectoModel.findOne({
      id: id
    });
    return ProyectoMapper.toDto(proyectoActualizado);
  }

  async remove(id: string): Promise<ProyectoDto> {
    const encontrado: Proyecto = await this.proyectoModel.findOne({
      id: id
    });
    if (!encontrado) {
      throw Error("No se encontró el proyecto");
    }
    await this.proyectoModel.deleteOne({
      id: id
    });
    return ProyectoMapper.toDto(encontrado);
  }
}
