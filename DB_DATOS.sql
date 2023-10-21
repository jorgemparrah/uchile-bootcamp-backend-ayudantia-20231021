USE `GIT`;

INSERT INTO `Usuarios` (`nombre`, `clave`, `correo`, `nombre_mostrar`)
VALUES ('jorgemparrah', '1234', 'jorgemparrah@gmail.com', 'Jorge Parra'),
('usuario2', '12345', 'usuario@mail.com', 'Usuario 2'),
('usuario3', '12345', 'usuario3@mail.com', 'Usuario 3');

INSERT INTO `Proyectos` (`id`, `nombre`)
VALUES ('ayudantia', 'Ayudantia'),
('clases', 'Clases'),
('ejercicios', 'Ejercicios');

INSERT INTO `Repositorios` (`id`, `ruta`, `descripcion`, `publico`, `idProyecto`)
VALUES ('repo1', 'https/github.com/jorgemparrah/EjercicioGit.git', '', TRUE, 'ejercicios'),
('repo2', 'https/github.com/jorgemparrah/EjercicioNest.git', '', TRUE, 'ejercicios'),
('repo3', 'https/github.com/jorgemparrah/ClaseDB.git', '', TRUE, 'clases'),
('repo4', 'https/github.com/jorgemparrah/AyudantiaORM.git', '', TRUE, 'ayudantia');

INSERT INTO `Permisos` (`nombreUsuario`, `idRepositorio`)
VALUES ('jorgemparrah', 'repo1'),
('jorgemparrah', 'repo2'),
('jorgemparrah', 'repo3'),
('jorgemparrah', 'repo4'),
('usuario2', 'repo1'),
('usuario2', 'repo2'),
('usuario3', 'repo3'),
('usuario3', 'repo4');