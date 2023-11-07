import { ObjectId } from "mongodb";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: 'Repositorios'})
export class Repositorio {

  @ObjectIdColumn({ name: '_id' })
  _id: ObjectId;

  @Column({ name: 'idRepositorio' })
  idRepositorio: string;

  @Column({ name: 'ruta' })
  ruta: string;

  @Column({ name: 'descripcion' })
  descripcion: string;

  @Column({ name: 'publico' })
  publico: boolean;

  @Column({ name: 'idProyecto' })
  idProyecto: string;

  @Column( (type) => Usuario )
  usuarios: Usuario[];

}
