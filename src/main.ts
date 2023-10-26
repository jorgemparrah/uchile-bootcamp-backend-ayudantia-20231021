import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsuarioModule } from './usuario/usuario.module';
import { RepositorioModule } from './repositorio/repositorio.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configUsuario = new DocumentBuilder()
    .setTitle('Usuario')
    .setDescription('API de Usuario')
    .setVersion('1.0')
    .build()
  const documentUsuario = SwaggerModule.createDocument(app, configUsuario, {
    include: [ UsuarioModule ],
  });
  SwaggerModule.setup('api/usuario', app, documentUsuario)

const configRepositorio = new DocumentBuilder()
  .setTitle('Repositorio')
  .setDescription('API de Repositorio')
  .setVersion('1.0')
  .build()
const documentRepositorio = SwaggerModule.createDocument(app, configRepositorio, {
  include: [ RepositorioModule ],
});
SwaggerModule.setup('api/repositorio', app, documentRepositorio)

  await app.listen(3000);
}
bootstrap();
