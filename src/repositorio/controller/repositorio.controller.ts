import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RepositorioService } from '../service/repositorio.service';
import { CreateRepositorioDto } from '../dto/create-repositorio.dto';
import { RepositorioDto } from '../dto/repositorio.dto';
import { UpdateRepositorioDto } from '../dto/update-repositorio.dto';

@Controller('repositorio')
@ApiTags('Repositorio')
@UsePipes(ValidationPipe)
export class RepositorioController {
  constructor(private readonly repositorioService: RepositorioService) {}

  @Post()
  @ApiBody({ type: CreateRepositorioDto, description: 'Datos del repositorio a crear' })
  @ApiBadRequestResponse({ description: 'Ya existe un repositorio con ese id' })
  @ApiCreatedResponse({ description: 'El repositorio fue creado exitosamente', type: RepositorioDto })
  async create(@Body() createRepositorioDto: CreateRepositorioDto): Promise<RepositorioDto> {
    try {
      const resultado = await this.repositorioService.create(createRepositorioDto);
      return resultado;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: "dRepositorios encontrados", type: RepositorioDto, isArray: true })
  async findAll(): Promise<RepositorioDto[]> {
    const resultado = await this.repositorioService.findAll();
    return resultado;
  }

  @Get(':id')
  @ApiOkResponse({ description: "dRepositorio encontrado", type: RepositorioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async findOne(@Param('id') id: string): Promise<RepositorioDto> {
    try {
      const resultado = await this.repositorioService.findOne(id);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  @ApiBody({ type: UpdateRepositorioDto, description: 'Datos del repositorio a actualizar' })
  @ApiOkResponse({ description: "dRepositorio actualizado", type: RepositorioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async update(@Param('id') id: string, @Body() updateRepositorioDto: UpdateRepositorioDto): Promise<RepositorioDto> {
    try {
      const resultado = await this.repositorioService.update(id, updateRepositorioDto);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: "dRepositorio eliminado", type: RepositorioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async remove(@Param('id') id: string): Promise<RepositorioDto> {
    try {
      const resultado = await this.repositorioService.remove(id);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
