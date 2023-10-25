import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoDto } from './dto/proyecto.dto';
import { ProyectoMapper } from './mapper/proyecto.mapper';

@Injectable()
export class ProyectoService {

  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<ProyectoDto> {
    const entidad : Proyecto = ProyectoMapper.toEntity(createProyectoDto);
    const resultado : Proyecto = await this.proyectoRepository.save(entidad);
    return ProyectoMapper.toDto(resultado);
  }

  findAll() {
    return `This action returns all proyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proyecto`;
  }

  update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return `This action updates a #${id} proyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} proyecto`;
  }
}
