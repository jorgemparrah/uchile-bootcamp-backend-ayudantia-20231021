import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { ProyectoModule } from './proyecto/proyecto.module';
import { Proyecto } from './proyecto/entities/proyecto.entity';
import { RepositorioModule } from './repositorio/repositorio.module';
import { Repositorio } from './repositorio/entities/repositorio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // 127.0.0.1
      port: 3306,
      username: 'root',
      password: 'clave123',
      database: 'GIT',
      entities: [
        Usuario,
        Proyecto,
        Repositorio
      ]
    }),
    UsuarioModule,
    ProyectoModule,
    RepositorioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
