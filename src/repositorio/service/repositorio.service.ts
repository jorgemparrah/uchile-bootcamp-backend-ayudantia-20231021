import { Injectable } from '@nestjs/common';
import { CreateRepositorioDto } from '../dto/create-repositorio.dto';
import { UpdateRepositorioDto } from '../dto/update-repositorio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repositorio } from '../entities/repositorio.entity';
import { Repository } from 'typeorm';
import { RepositorioDto } from '../dto/repositorio.dto';
import { RepositorioMapper } from '../mapper/repositorio.mapper';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class RepositorioService {

  constructor(
    @InjectRepository(Repositorio)
    private repositorioRepository: Repository<Repositorio>,
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>
  ) {}

  async create(createRepositorioDto: CreateRepositorioDto): Promise<RepositorioDto> {
    const encontrado : boolean = await this.repositorioRepository.exist({
      where: {
        id: createRepositorioDto.id
      }
    });
    if (encontrado) {
      throw Error("Ya existe un repositorio con ese id");
    }
    if (createRepositorioDto.idProyecto) {
      const existeProyecto = await this.proyectoRepository.exist({
        where: {
          id: createRepositorioDto.idProyecto
        }
      });
      if (!existeProyecto) {
        throw Error("No existe el proyecto");
      }
    }

    const entidad : Repositorio = RepositorioMapper.toEntity(createRepositorioDto);
    const resultado : Repositorio = await this.repositorioRepository.save(entidad);
    return RepositorioMapper.toDto(resultado);
  }

  async findAll(): Promise<RepositorioDto[]> {
    const resultado : Repositorio[] = await this.repositorioRepository.find({
      relations: {
        proyecto: true
      },
      select: {
        idProyecto: false,
      }
    });
    return RepositorioMapper.toDtoList(resultado);
  }

  async findOne(id: string): Promise<RepositorioDto> {
    const resultado : Repositorio = await this.repositorioRepository.findOne({
      where: {
        id: id
      },
      select: {
        idProyecto: false,
      },
      relations: {
        proyecto: true
      }
    });
    if (!resultado) {
      throw Error("No se encontró el repositorio");
    }
    return RepositorioMapper.toDto(resultado);
  }

  async update(id: string, updateRepositorioDto: UpdateRepositorioDto): Promise<RepositorioDto> {
    const encontrado: Repositorio = await this.repositorioRepository.findOne({
      where: {
        id: id
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el repositorio");
    }
    if (updateRepositorioDto.descripcion) {
      encontrado.descripcion = updateRepositorioDto.descripcion;
    }
    if (updateRepositorioDto.idProyecto) {
      encontrado.idProyecto = updateRepositorioDto.idProyecto;
    }
    if (updateRepositorioDto.publico) {
      encontrado.publico = updateRepositorioDto.publico;
    }
    if (updateRepositorioDto.ruta) {
      encontrado.ruta = updateRepositorioDto.ruta;
    }

    const resultado: Repositorio = await this.repositorioRepository.save(encontrado);
    return RepositorioMapper.toDto(resultado);
  }

  async remove(id: string): Promise<RepositorioDto> {
    const encontrado: Repositorio = await this.repositorioRepository.findOne({
      where: {
        id: id
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el repositorio");
    }
    await this.repositorioRepository.remove(encontrado);
    return RepositorioMapper.toDto(encontrado);
  }
}
