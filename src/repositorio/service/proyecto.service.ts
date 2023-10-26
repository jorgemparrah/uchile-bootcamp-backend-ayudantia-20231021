import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { ProyectoDto } from '../dto/proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { ProyectoMapper } from '../mapper/proyecto.mapper';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<ProyectoDto> {
    const encontrado : boolean = await this.proyectoRepository.exist({
      where: {
        id: createProyectoDto.id
      }
    });
    if (encontrado) {
      throw Error("Ya existe un proyecto con ese id");
    }
    const entidad : Proyecto = ProyectoMapper.toEntity(createProyectoDto);
    const resultado : Proyecto = await this.proyectoRepository.save(entidad);
    return ProyectoMapper.toDto(resultado);
  }

  async findAll(): Promise<ProyectoDto[]> {
    const resultado : Proyecto[] = await this.proyectoRepository.find({
      relations: {
        repositorios: true
      }
    });
    return ProyectoMapper.toDtoList(resultado);
  }

  async findOne(id: string): Promise<ProyectoDto> {
    const resultado : Proyecto = await this.proyectoRepository.findOne({
      where: {
        id: id
      },
      relations: {
        repositorios: true
      }
    });
    if (!resultado) {
      throw Error("No se encontró el proyecto");
    }
    return ProyectoMapper.toDto(resultado);
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto): Promise<ProyectoDto> {
    const encontrado: Proyecto = await this.proyectoRepository.findOne({
      where: {
        id: id
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el proyecto");
    }
    if (updateProyectoDto.nombre) {
      encontrado.nombre = updateProyectoDto.nombre;
    }

    const resultado: Proyecto = await this.proyectoRepository.save(encontrado);
    return ProyectoMapper.toDto(resultado);
  }

  async remove(id: string): Promise<ProyectoDto> {
    const encontrado: Proyecto = await this.proyectoRepository.findOne({
      where: {
        id: id
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el proyecto");
    }
    await this.proyectoRepository.remove(encontrado);
    return ProyectoMapper.toDto(encontrado);
  }
}
