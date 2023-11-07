import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity({ name: 'Usuarios'})
export class Usuario {

  @ObjectIdColumn()
  id: ObjectId;

  @Column({ name: 'nombre' })
  nombre: string;

  @Column({ name: 'clave' })
  clave: string;

  @Column({ name: 'correo' })
  correo: string;

  @Column({ name: 'nombre_mostrar' })
  nombreMostrar: string;

}
