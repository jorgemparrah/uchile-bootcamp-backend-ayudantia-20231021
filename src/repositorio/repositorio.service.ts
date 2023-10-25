import { Injectable } from '@nestjs/common';
import { CreateRepositorioDto } from './dto/create-repositorio.dto';
import { UpdateRepositorioDto } from './dto/update-repositorio.dto';

@Injectable()
export class RepositorioService {
  create(createRepositorioDto: CreateRepositorioDto) {
    return 'This action adds a new repositorio';
  }

  findAll() {
    return `This action returns all repositorio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repositorio`;
  }

  update(id: number, updateRepositorioDto: UpdateRepositorioDto) {
    return `This action updates a #${id} repositorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} repositorio`;
  }
}
