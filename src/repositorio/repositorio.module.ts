import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoController } from './controller/proyecto.controller';
import { RepositorioController } from './controller/repositorio.controller';
import { Proyecto } from './entities/proyecto.entity';
import { Repositorio } from './entities/repositorio.entity';
import { ProyectoService } from './service/proyecto.service';
import { RepositorioService } from './service/repositorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Repositorio])],
  controllers: [RepositorioController, ProyectoController],
  providers: [RepositorioService, ProyectoService],
})
export class RepositorioModule {}
