import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('usuario')
@UsePipes(ValidationPipe)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiBadRequestResponse({ description: "Ya existe un usuario con ese nombre" })
  @ApiCreatedResponse({ description: "El usuario se creó correctamente", type: UsuarioDto })
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioDto> {
    try {
      const resultado = await this.usuarioService.create(createUsuarioDto);
      return resultado;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ description: "Usuarios encontrados", type: UsuarioDto, isArray: true })
  async findAll(): Promise<UsuarioDto[]> {
    const resultado = await this.usuarioService.findAll();
    return resultado;
  }

  @Get(':nombre')
  @ApiOkResponse({ description: "Usuario encontrado", type: UsuarioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async findOne(@Param('nombre') nombre: string): Promise<UsuarioDto> {
    try {
      const resultado = await this.usuarioService.findOne(nombre);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':nombre')
  @ApiOkResponse({ description: "Usuario actualizado", type: UsuarioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async update(@Param('nombre') nombre: string, @Body() updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioDto> {
    try {
      const resultado = await this.usuarioService.update(nombre, updateUsuarioDto);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':nombre')
  @ApiOkResponse({ description: "Usuario eliminado", type: UsuarioDto })
  @ApiNotFoundResponse({ description: "No se encontró el usuario" })
  async remove(@Param('nombre') nombre: string): Promise<UsuarioDto> {
    try {
      const resultado = await this.usuarioService.remove(nombre);
      return resultado;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
