import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'Usuarios'})
export class Usuario {

  @Prop({ name: 'nombre' })
  nombre: string;

  @Prop({ name: 'clave' })
  clave: string;

  @Prop({ name: 'correo' })
  correo: string;

  @Prop({ name: 'nombre_mostrar' })
  nombreMostrar: string;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);