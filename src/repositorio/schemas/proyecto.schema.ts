import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Repositorio } from "./repositorio.schema";
import mongoose, { Document } from "mongoose";

@Schema({ collection: 'Proyectos'})
export class Proyecto extends Document {

  @Prop({ name: 'id' })
  id: string;

  @Prop({ name: 'nombre' })
  nombre: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Repositorio' })
  repositorios: Repositorio[];

}

export const ProyectoSchema = SchemaFactory.createForClass(Proyecto);

