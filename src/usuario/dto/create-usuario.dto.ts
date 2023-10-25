import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsString, Length } from "class-validator";

export class CreateUsuarioDto {

  @ApiProperty({ example: "EjemploUsuario", description: "Nombre de usuario" })
  @IsAlpha()
  @IsString()
  nombre: string;

  @ApiProperty({ example: "ABCDEF12345678", description: "Contraseña para inicio de sesión" })
  @Length(8, 16)
  @IsString()
  clave: string;

  @ApiProperty({ example: "ejemplo@gmail.com", description: "Correo electronico del usuario" })
  @IsEmail()
  @IsString()
  correo: string;

  @ApiProperty({ example: "Ejemplo Usuario Uno", description: "Nombre que se mostrará en la pantalla" })
  @IsString()
  nombreMostrar: string;

}
