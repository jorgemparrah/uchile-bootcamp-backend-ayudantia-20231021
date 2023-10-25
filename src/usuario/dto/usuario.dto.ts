import { ApiProperty } from "@nestjs/swagger";

export class UsuarioDto {

  @ApiProperty({ example: "EjemploUsuario", description: "Nombre de usuario" })
  nombre: string;

  @ApiProperty({ example: "ejemplo@gmail.com", description: "Correo electronico del usuario" })
  correo: string;

  @ApiProperty({ example: "Ejemplo Usuario Uno", description: "Nombre que se mostrará en la pantalla" })
  nombreMostrar: string;

}
