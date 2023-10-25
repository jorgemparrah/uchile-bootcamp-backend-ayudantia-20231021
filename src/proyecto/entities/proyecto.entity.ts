import { Repositorio } from "src/repositorio/entities/repositorio.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'Proyectos'})
export class Proyecto {

  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'nombre' })
  nombre: string;

  @OneToMany(() => Repositorio, (repo) => repo.proyecto) // LISTA DE REPOSITORIOS QUE TIENE ESTE PROYECTO
  repositorios: Repositorio[];

}

