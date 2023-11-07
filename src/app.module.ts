import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Proyecto } from './repositorio/entities/proyecto.entity';
import { RepositorioModule } from './repositorio/repositorio.module';
import { Repositorio } from './repositorio/entities/repositorio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost', // 127.0.0.1
      port: 27017,
      username: 'mongo',
      password: 'clave123',
      database: 'GIT',
      entities: [
        Usuario,
        Proyecto,
        Repositorio
      ]
    }),
    UsuarioModule,
    RepositorioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
