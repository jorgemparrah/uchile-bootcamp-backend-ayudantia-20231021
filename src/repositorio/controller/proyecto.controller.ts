import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, ValidationPipe, UsePipes } from '@nestjs/common';
import { ProyectoService } from '../service/proyecto.service';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { ProyectoDto } from '../dto/proyecto.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('proyecto')
@ApiTags('Proyecto')
@UsePipes(ValidationPipe)
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  @ApiBody({ type: CreateProyectoDto, description: 'Datos del proyecto a crear' })
  @ApiBadRequestResponse({ description: 'Ya existe un proyecto con ese id' })
  @ApiCreatedResponse({ description: 'El proyecto fue creado exitosamente', type: ProyectoDto })
  async create(@Body() createProyectoDto: CreateProyectoDto): Promise<ProyectoDto> {
    try {
      const resultado = await this.proyectoService.create(createProyectoDto);
      return resultado;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: "Proyectos encontrados", type: ProyectoDto, isArray: true })
  async findAll(): Promise<ProyectoDto[]> {
    const resultado = await this.proyectoService.findAll();
    return resultado;
  }

  @Get('consulta')
  async consulta() {
    try {
      const resultado = await this.proyectoService.consulta();
      return resultado;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: "Proyecto encontrado", type: ProyectoDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async findOne(@Param('id') id: string): Promise<ProyectoDto> {
    try {
      const resultado = await this.proyectoService.findOne(id);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProyectoDto, description: 'Datos del proyecto a actualizar' })
  @ApiOkResponse({ description: "Proyecto actualizado", type: ProyectoDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto): Promise<ProyectoDto> {
    try {
      const resultado = await this.proyectoService.update(id, updateProyectoDto);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: "Proyecto eliminado", type: ProyectoDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async remove(@Param('id') id: string): Promise<ProyectoDto> {
    try {
      const resultado = await this.proyectoService.remove(id);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

 
}
