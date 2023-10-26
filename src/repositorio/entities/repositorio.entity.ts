import { Proyecto } from "src/repositorio/entities/proyecto.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'Repositorios'})
export class Repositorio {

  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'ruta' })
  ruta: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'publico' })
  publico: boolean;

  @Column({ name: 'idProyecto' })
  idProyecto: string;

  @ManyToOne(() => Proyecto) // A QUE PROYECTO PERTENECE ESTE REPOSITORIO
  @JoinColumn({ name: 'idProyecto' })
  proyecto: Proyecto;

}
