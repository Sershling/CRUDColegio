-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.29 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para colegio
DROP DATABASE IF EXISTS `colegio`;
CREATE DATABASE IF NOT EXISTS `colegio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `colegio`;

-- Volcando estructura para tabla colegio.alumno
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE IF NOT EXISTS `alumno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla colegio.alumno: ~7 rows (aproximadamente)
DELETE FROM `alumno`;
INSERT INTO `alumno` (`id`, `nombre`, `apellidos`, `genero`, `fechaNacimiento`) VALUES
	(2, 'Fernando', 'Montañez', 'H', '2005-05-23'),
	(4, 'Pedro', 'Najera', 'H', '2001-11-03'),
	(5, 'Sergio', 'Cervantes', 'H', '2000-03-18'),
	(7, 'Gabriel', 'Praderas', 'H', '1989-11-08'),
	(9, 'Valeria', 'Rios', 'M', '1989-11-08'),
	(12, 'Agustin', 'Rodriguez', 'H', '1989-11-08'),
	(13, 'Marco', 'Polo', 'M', '2001-11-03'),
	(14, 'Luis', 'Martinez', 'H', '1995-02-07');

-- Volcando estructura para tabla colegio.alumno_grado
DROP TABLE IF EXISTS `alumno_grado`;
CREATE TABLE IF NOT EXISTS `alumno_grado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumnoId` int NOT NULL,
  `gradoId` int NOT NULL,
  `seccion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a04f80320755c5b604ec4a4f02f` (`gradoId`),
  KEY `FK_333056642f017cb02f78956171f` (`alumnoId`),
  CONSTRAINT `FK_333056642f017cb02f78956171f` FOREIGN KEY (`alumnoId`) REFERENCES `alumno` (`id`),
  CONSTRAINT `FK_a04f80320755c5b604ec4a4f02f` FOREIGN KEY (`gradoId`) REFERENCES `grado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla colegio.alumno_grado: ~0 rows (aproximadamente)
DELETE FROM `alumno_grado`;

-- Volcando estructura para tabla colegio.grado
DROP TABLE IF EXISTS `grado`;
CREATE TABLE IF NOT EXISTS `grado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `profesorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_172f0725779a33c35c049402a33` (`profesorId`),
  CONSTRAINT `FK_172f0725779a33c35c049402a33` FOREIGN KEY (`profesorId`) REFERENCES `profesor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla colegio.grado: ~0 rows (aproximadamente)
DELETE FROM `grado`;
INSERT INTO `grado` (`id`, `nombre`, `profesorId`) VALUES
	(4, 'Medicina', 2),
	(6, 'Fisica', 1),
	(7, 'Pscologia', 5);

-- Volcando estructura para tabla colegio.profesor
DROP TABLE IF EXISTS `profesor`;
CREATE TABLE IF NOT EXISTS `profesor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla colegio.profesor: ~0 rows (aproximadamente)
DELETE FROM `profesor`;
INSERT INTO `profesor` (`id`, `nombre`, `apellidos`, `genero`) VALUES
	(1, 'Rodrigo', 'Sanchez', 'H'),
	(2, 'Leonardo', 'Lopez', 'M'),
	(4, 'Antonio', 'Andrade', 'H'),
	(5, 'Laura', 'Castañeda', 'M');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
