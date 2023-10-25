import { Module } from '@nestjs/common';
import { RepositorioService } from './repositorio.service';
import { RepositorioController } from './repositorio.controller';

@Module({
  controllers: [RepositorioController],
  providers: [RepositorioService],
})
export class RepositorioModule {}
