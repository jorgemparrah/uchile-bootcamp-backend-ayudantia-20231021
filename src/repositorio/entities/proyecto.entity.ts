import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: 'Proyectos'})
export class Proyecto {

  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'idProyecto' })
  idProyecto: string;

  @Column({ name: 'nombre' })
  nombre: string;

}

