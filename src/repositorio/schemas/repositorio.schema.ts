import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Proyecto } from "./proyecto.schema";
import { ObjectId } from "mongodb";

@Schema({ collection: 'Repositorios'})
export class Repositorio {

  @Prop({ name: 'id' })
  id: string;

  @Prop({ name: 'ruta' })
  ruta: string;

  @Prop({ name: 'descripcion' })
  descripcion: string;

  @Prop({ name: 'publico' })
  publico: boolean;

  @Prop({ name: 'idProyecto' })
  idProyecto: ObjectId;

  @Prop({ type: ObjectId, ref: 'Proyecto' })
  proyecto: Proyecto;

}

export const RepositorioSchema = SchemaFactory.createForClass(Repositorio);
