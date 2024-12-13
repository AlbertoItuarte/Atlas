-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS atlas;

-- Seleccionar la base de datos
USE atlas;

-- Crear la tabla Coaches si no existe
CREATE TABLE IF NOT EXISTS Coaches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL
);

-- Crear la tabla Clientes si no existe
CREATE TABLE IF NOT EXISTS Clientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    ApellidoP VARCHAR(255) NOT NULL,
    ApellidoM VARCHAR(255) NOT NULL,
    IdCoach INT,
    Correo VARCHAR(255) NOT NULL,
    Celular VARCHAR(255),
    FechaNac DATE,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla EvaluacionesFisicas si no existe
CREATE TABLE IF NOT EXISTS EvaluacionesFisicas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    FechaEval DATE NOT NULL,
    Peso DECIMAL(5,2),
    PorcentGrasa DECIMAL(5,2),
    Notas TEXT,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id)
);

-- Crear la tabla CategoriasEjercicios si no existe
CREATE TABLE IF NOT EXISTS CategoriasEjercicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Categoria VARCHAR(255) NOT NULL
);

-- Crear la tabla MusculosObjetivos si no existe
CREATE TABLE IF NOT EXISTS MusculosObjetivos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MusculoObjetivo VARCHAR(255) NOT NULL,
    IdCategoria INT NOT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES CategoriasEjercicios(Id)
);

-- Crear la tabla Ejercicios si no existe
CREATE TABLE IF NOT EXISTS Ejercicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ejercicio VARCHAR(255) NOT NULL,
    IdMusculoObjetivo INT,
    IdCategoriaEjercicio INT,
    FOREIGN KEY (IdMusculoObjetivo) REFERENCES MusculosObjetivos(Id),
    FOREIGN KEY (IdCategoriaEjercicio) REFERENCES CategoriasEjercicios(Id)
);

-- Crear la tabla Horarios si no existe
CREATE TABLE IF NOT EXISTS Horarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    DiaSemana VARCHAR(20) NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    IdCoach INT NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id)
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Planes si no existe
CREATE TABLE IF NOT EXISTS Planes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    IdCoach INT NOT NULL,
    Plan VARCHAR(255) NOT NULL,
    Duración INT NOT NULL, -- Duración en días, meses, etc.
    Costo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Contratos si no existe
CREATE TABLE IF NOT EXISTS Contratos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdPlan INT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE
    FOREIGN KEY (IdPlan) REFERENCES Planes(id)
);

-- Crear la tabla Pagos si no existe
CREATE TABLE IF NOT EXISTS Pagos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdContrato INT NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    FechaPago DATE NOT NULL,
    FOREIGN KEY (IdContrato) REFERENCES Contratos(Id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS RutinasClientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdEjercicio INT NOT NULL,
    Series INT NOT NULL,
    Repeticiones INT NOT NULL,
    Dia VARCHAR(20) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id),
    FOREIGN KEY (IdEjercicio) REFERENCES Ejercicios(Id),
    UNIQUE KEY unique_rutina_cliente (IdCliente, IdEjercicio, Dia) -- Evita duplicados
);

-- Crear la tabla MisRutinas si no existe
CREATE TABLE IF NOT EXISTS MisRutinas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCoach INT NOT NULL,
    IdEjercicio INT NOT NULL,
    Series INT NOT NULL,
    Repeticiones INT NOT NULL,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id),
    FOREIGN KEY (IdEjercicio) REFERENCES Ejercicios(Id)
);


INSERT INTO Coaches (Usuario, Password)
VALUES ('Yisus', '123456');

INSERT INTO Clientes (Nombre, ApellidoP, ApellidoM, IdCoach, Correo, Celular, FechaNac)
VALUES
('Ana', 'Pérez', 'Gómez', 1, 'ana.perez@gmail.com', '5551234567', '1995-04-12'),
('Juan', 'Hernández', 'Martínez', 1, 'juan.hernandez@hotmail.com', '5559876543', '1989-11-23'),
('Sofía', 'López', 'Ramírez', 1, 'sofia.lopez@yahoo.com', '5555678910', '2001-07-15'),
('Carlos', 'González', 'Torres', 1, 'carlos.gonzalez@outlook.com', '5552345678', '1993-02-28');

INSERT INTO Horarios (IdCliente, DiaSemana, HoraInicio, HoraFin)
VALUES
(1, 'Lunes', '07:00', '09:00'),
(1, 'Martes', '08:00', '10:00'),
(1, 'Miércoles', '09:00', '11:00'),
(1, 'Jueves', '10:00', '12:00');

INSERT INTO CategoriasEjercicios (Categoria)
VALUES
('Empuje'),
('Jalon'),
('Pierna');

INSERT INTO EvaluacionesFisicas (Id, IdCliente, FechaEval, Peso, PorcentGrasa, Notas)
VALUES
(1, 1, '2024-12-05', 56, 15, 'Aumento de masa muscular'),
(2, 2, '2024-12-05', 64, 18, 'Mantenimiento'),
(3, 3, '2024-12-05', 80, 27, 'Disminuir grasa corporal'),
(4, 4, '2024-12-05', 75, 22, 'Competencia');

INSERT INTO MusculosObjetivos (MusculoObjetivo, idCategoria)
VALUES
('Pecho', 1),
('Tricep', 1),
('Hombro', 1),
('Espalda', 2),
('Antebrazo', 2),
('Bicep', 2),
('Cuadricep', 3),
('Femoral', 3),
('Chamorro', 3),
('Glúteo', 3);

INSERT INTO Ejercicios (Ejercicio, IdMusculoObjetivo, IdCategoriaEjercicio)
VALUES
('Press banca', 1, 1),
('Peck Deck', 1, 1),
('Press inclinado', 1, 1),
('Press declinado', 1, 1),
('Press con mancuernas', 1, 1),
('Press francés', 2, 1),
('Extensión trasnuca polea', 2, 1),
('Extensión con soga', 2, 1),
('Extensión con mancuernas', 2, 1),
('Elevaciones laterales polea/máquina', 3, 1),
('Elevaciones laterales mancuernas', 3, 1),
('Press militar mancuernas/barra/máquina', 3, 1),
('Remo con agarre amplio', 4, 2),
('Peck Deck', 4, 2),
('Jalon vertical', 4, 2),
('Remo gironda', 4, 2),
('Pull over', 4, 2),
('Dominadas', 4, 2),
('Dominadas asistidas', 4, 2),
('Remo en máquina', 4, 2),
('Curl de muñeca', 5, 2),
('Curl de muñeca inverso', 5, 2),
('Front lever', 5, 2),
('Curl invertido', 5, 2),
('Curl martillo', 5, 2),
('Curl de Bicep', 6, 2),
('Curl mesero', 6, 2),
('Curl en máquina/polea', 6, 2),
('Curl inclinado', 6, 2),
('Curl araña', 6, 2),
('Sentadilla Hack', 7, 3),
('Sentadilla con barra', 7, 3),
('Sentadilla en smith', 7, 3),
('Búlgaras', 7, 3),
('Extensiones de Cuadricep', 7, 3),
('Prensa', 7, 3),
('Curl acostado', 8, 3),
('Curl sentado', 8, 3),
('Curl de pie', 8, 3),
('Peso muerto', 8, 3),
('Elevaciones de pie', 9, 3),
('Elevaciones sentado', 9, 3),
('Hip thrust', 10, 3),
('Patada de glúteo', 10, 3),
('Búlgaras', 10, 3);

INSERT INTO RutinasClientes (IdCliente, IdEjercicio, Series, Repeticiones)
VALUES
(1, 3, 3, 12, 'Lunes'),
(1, 13, 4, 8, 'Lunes'),
(1, 36, 3, 15, 'Lunes'),
(1, 2, 4, 15, 'Lunes');

INSERT INTO MisRutinas (IdCoach, IdEjercicio, Series, Repeticiones)
VALUES
(1, 3, 3, 12),
(1, 13, 3, 10),
(1, 36, 3, 12);

INSERT INTO Planes (IdCoach, Plan, Duración, Costo)
VALUES
(1, 'Básico', 1, 500),
(1, 'Intermedio', 3, 1400),
(1, 'Avanzado', 6, 2500),
(1, 'Premium', 12, 4000);

INSERT INTO Contratos (IdCliente, IdPlan, FechaInicio, FechaFin)
VALUES
(1, 1, '2024-01-01', '2024-03-31'),
(2, 2, '2024-02-01', '2024-04-30'),
(3, 1, '2024-03-01', '2024-05-31'),
(4, 3, '2024-01-15', '2024-06-14');

INSERT INTO Pagos (IdContrato, Monto, FechaPago)
VALUES
(1, 500, '2024-01-15'),
(2, 500, '2024-02-15'),
(3, 500, '2024-03-15'),
(4, 1400, '2024-01-15');

ALTER TABLE EvaluacionesFisicas
DROP FOREIGN KEY EvaluacionesFisicas_ibfk_1;

ALTER TABLE EvaluacionesFisicas
ADD CONSTRAINT EvaluacionesFisicas_ibfk_1
FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE;

ALTER TABLE Horarios
DROP FOREIGN KEY Horarios_ibfk_1;

ALTER TABLE Horarios
ADD CONSTRAINT Horarios_ibfk_1
FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE;

ALTER TABLE Contratos
DROP FOREIGN KEY Contratos_ibfk_1;

ALTER TABLE Contratos
ADD CONSTRAINT Contratos_ibfk_1
FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE;

ALTER TABLE Pagos
DROP FOREIGN KEY Pagos_ibfk_1;

ALTER TABLE Pagos
ADD CONSTRAINT Pagos_ibfk_1
FOREIGN KEY (IdContrato) REFERENCES Contratos(Id) ON DELETE CASCADE;

ALTER TABLE RutinasClientes
DROP FOREIGN KEY RutinasClientes_ibfk_1;

ALTER TABLE RutinasClientes
ADD CONSTRAINT RutinasClientes_ibfk_1
FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE;