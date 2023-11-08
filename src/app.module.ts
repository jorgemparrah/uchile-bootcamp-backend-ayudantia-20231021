import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositorioModule } from './repositorio/repositorio.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:clave123@localhost:27017/GIT_MONGOOSE'),
    UsuarioModule,
    RepositorioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

