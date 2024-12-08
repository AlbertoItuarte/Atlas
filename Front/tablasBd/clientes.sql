/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `clientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `ApellidoP` varchar(255) NOT NULL,
  `ApellidoM` varchar(255) NOT NULL,
  `IdCoach` int(11) DEFAULT NULL,
  `Correo` varchar(255) NOT NULL,
  `Celular` varchar(255) DEFAULT NULL,
  `FechaNac` date DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdCoach` (`IdCoach`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`IdCoach`) REFERENCES `coaches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `clientes` (`Id`, `Nombre`, `ApellidoP`, `ApellidoM`, `IdCoach`, `Correo`, `Celular`, `FechaNac`) VALUES
(1, 'Ana', 'Pérez', 'Gómez', 1, 'ana.perez@gmail.com', '5551234567', '1995-04-12');
INSERT INTO `clientes` (`Id`, `Nombre`, `ApellidoP`, `ApellidoM`, `IdCoach`, `Correo`, `Celular`, `FechaNac`) VALUES
(2, 'Juan', 'Hernández', 'Martínez', 1, 'juan.hernandez@hotmail.com', '5559876543', '1989-11-23');
INSERT INTO `clientes` (`Id`, `Nombre`, `ApellidoP`, `ApellidoM`, `IdCoach`, `Correo`, `Celular`, `FechaNac`) VALUES
(3, 'Sofía', 'López', 'Ramírez', 1, 'sofia.lopez@yahoo.com', '5555678910', '2001-07-15');
INSERT INTO `clientes` (`Id`, `Nombre`, `ApellidoP`, `ApellidoM`, `IdCoach`, `Correo`, `Celular`, `FechaNac`) VALUES
(4, 'Carlos', 'González', 'Torres', 1, 'carlos.gonzalez@outlook.com', '5552345678', '1993-02-28');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;