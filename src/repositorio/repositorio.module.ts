import { Module } from '@nestjs/common';
import { ProyectoController } from './controller/proyecto.controller';
import { RepositorioController } from './controller/repositorio.controller';
import { ProyectoService } from './service/proyecto.service';
import { RepositorioService } from './service/repositorio.service';
import { Proyecto, ProyectoSchema } from './schemas/proyecto.schema';
import { Repositorio, RepositorioSchema } from './schemas/repositorio.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Proyecto.name, schema: ProyectoSchema
    },{
      name: Repositorio.name, schema: RepositorioSchema
    }])
  ],
  controllers: [RepositorioController, ProyectoController],
  providers: [RepositorioService, ProyectoService],
})
export class RepositorioModule {}
