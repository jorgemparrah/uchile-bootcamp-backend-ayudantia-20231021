import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, MongoEntityManager, MongoRepository, Repository } from 'typeorm';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { ProyectoDto } from '../dto/proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { ProyectoMapper } from '../mapper/proyecto.mapper';
import { Repositorio } from '../entities/repositorio.entity';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(Proyecto)
    private proyectoRepository: MongoRepository<Proyecto>
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<ProyectoDto> {
    const cantidad : number = await this.proyectoRepository.count({
      where: {
        idProyecto: createProyectoDto.id
      }
    });
    if (cantidad > 0) {
      throw Error("Ya existe un proyecto con ese id");
    }
    const entidad : Proyecto = ProyectoMapper.toEntity(createProyectoDto);
    const resultado : Proyecto = await this.proyectoRepository.save(entidad);
    return ProyectoMapper.toDto(resultado);
  }

  async findAll(): Promise<ProyectoDto[]> {
    const contadores = await this.consultarNumeroDeRepositorios();
    const resultado : Proyecto[] = await this.proyectoRepository.find({
    });
    const dtos = ProyectoMapper.toDtoList(resultado);
    const x = dtos.map(dto => {
      dto.cantidad = contadores.filter(x => x["_id"])[0].contador;
      return dto;
    });
    console.log(x);
    return x;
  }

  async findOne(id: string): Promise<ProyectoDto> {
    const resultado : Proyecto = await this.proyectoRepository.findOne({
      where: {
        idProyecto: id
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
        idProyecto: id
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
        idProyecto: id
      }
    });
    if (!encontrado) {
      throw Error("No se encontró el proyecto");
    }
    await this.proyectoRepository.deleteOne({
      idProyecto: id
    });
    return ProyectoMapper.toDto(encontrado);
  }

  private async consultarNumeroDeRepositorios() {
    const em : MongoEntityManager = this.dataSource.mongoManager;
    const resultado = await em.aggregate(Repositorio, [{
      $group: {
        _id: "$idProyecto",
        contador: {
          $count: {}
        }
      }
    }]).toArray();
    return resultado;
  }
}
