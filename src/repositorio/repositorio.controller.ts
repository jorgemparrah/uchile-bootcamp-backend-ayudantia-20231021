import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepositorioService } from './repositorio.service';
import { CreateRepositorioDto } from './dto/create-repositorio.dto';
import { UpdateRepositorioDto } from './dto/update-repositorio.dto';

@Controller('repositorio')
export class RepositorioController {
  constructor(private readonly repositorioService: RepositorioService) {}

  @Post()
  create(@Body() createRepositorioDto: CreateRepositorioDto) {
    return this.repositorioService.create(createRepositorioDto);
  }

  @Get()
  findAll() {
    return this.repositorioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repositorioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepositorioDto: UpdateRepositorioDto) {
    return this.repositorioService.update(+id, updateRepositorioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repositorioService.remove(+id);
  }
}
