import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from 'mongodb';
import { Repositorio } from "./repositorio.schema";

@Schema({ collection: 'Proyectos'})
export class Proyecto {

  @Prop({ name: 'id' })
  id: string;

  @Prop({ name: 'nombre' })
  nombre: string;

  @Prop({ type: [ObjectId], ref: 'Repositorio' })
  repositorios: Repositorio[];

}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);

