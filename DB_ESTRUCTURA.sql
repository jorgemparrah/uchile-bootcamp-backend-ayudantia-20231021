CREATE DATABASE `GIT`;

USE `GIT`;

CREATE TABLE `Usuarios` (
  `nombre` VARCHAR(100) PRIMARY KEY,
  `clave` VARCHAR(100),
  `correo` VARCHAR(100),
  `nombre_mostrar` VARCHAR(100)
);

CREATE TABLE `Permisos` (
  `nombreUsuario` VARCHAR(100),
  `idRepositorio` VARCHAR(100),
  PRIMARY KEY (`nombreUsuario`, `idRepositorio`)
);

CREATE TABLE `Repositorios` (
  `id` VARCHAR(100) PRIMARY KEY,
  `ruta` VARCHAR(100),
  `descripcion` VARCHAR(100),
  `publico` BOOLEAN,
  `idProyecto` VARCHAR(100)
);

CREATE TABLE `Proyectos` (
  `id` VARCHAR(100) PRIMARY KEY,
  `nombre` VARCHAR(100)
);

ALTER TABLE `Permisos` ADD FOREIGN KEY (`nombreUsuario`) REFERENCES `Usuarios` (`nombre`);

ALTER TABLE `Permisos` ADD FOREIGN KEY (`idRepositorio`) REFERENCES `Repositorios` (`id`);

ALTER TABLE `Repositorios` ADD FOREIGN KEY (`idProyecto`) REFERENCES `Proyectos` (`id`);
