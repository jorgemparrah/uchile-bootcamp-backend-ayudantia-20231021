import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUsuarioDto {

  @ApiProperty({ example: "ABCDEF12345678", description: "Contraseña para inicio de sesión" })
  @Length(8, 16)
  @IsString()
  @IsOptional()
  clave: string;

  @ApiProperty({ example: "ejemplo@gmail.com", description: "Correo electronico del usuario" })
  @IsEmail()
  @IsString()
  @IsOptional()
  correo: string;

  @ApiProperty({ example: "Ejemplo Usuario Uno", description: "Nombre que se mostrará en la pantalla" })
  @IsString()
  @IsOptional()
  nombreMostrar: string;

}
