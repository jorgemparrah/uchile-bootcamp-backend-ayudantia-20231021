import { PartialType } from '@nestjs/mapped-types';
import { CreateRepositorioDto } from './create-repositorio.dto';

export class UpdateRepositorioDto extends PartialType(CreateRepositorioDto) {}
