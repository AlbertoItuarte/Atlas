-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS atlas;

-- Seleccionar la base de datos
USE atlas;

-- Crear la tabla Coaches
CREATE TABLE IF NOT EXISTS Coaches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Usuario VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_usuario (Usuario)
);

-- Crear la tabla Clientes
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

-- Crear la tabla EvaluacionesFisicas
CREATE TABLE IF NOT EXISTS EvaluacionesFisicas (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdCoach INT NOT NULL,
    FechaEval DATE NOT NULL,
    Peso DECIMAL(5,2),
    PorcentGrasa DECIMAL(5,2),
    Notas TEXT,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla CategoriasEjercicios
CREATE TABLE IF NOT EXISTS CategoriasEjercicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Categoria VARCHAR(255) NOT NULL
);

-- Crear la tabla MusculosObjetivos
CREATE TABLE IF NOT EXISTS MusculosObjetivos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MusculoObjetivo VARCHAR(255) NOT NULL,
    IdCategoria INT NOT NULL,
    FOREIGN KEY (IdCategoria) REFERENCES CategoriasEjercicios(Id)
);

-- Crear la tabla Ejercicios
CREATE TABLE IF NOT EXISTS Ejercicios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Ejercicio VARCHAR(255) NOT NULL,
    IdMusculoObjetivo INT,
    IdCategoriaEjercicio INT,
    IdCoach INT NOT NULL,
    FOREIGN KEY (IdMusculoObjetivo) REFERENCES MusculosObjetivos(Id),
    FOREIGN KEY (IdCategoriaEjercicio) REFERENCES CategoriasEjercicios(Id),
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Horarios
CREATE TABLE IF NOT EXISTS Horarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    DiaSemana VARCHAR(20) NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    IdCoach INT NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Planes
CREATE TABLE IF NOT EXISTS Planes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCoach INT NOT NULL,
    Plan VARCHAR(255) NOT NULL,
    Duracion INT NOT NULL, -- Duración en días, meses, etc.
    Costo DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Contratos
CREATE TABLE IF NOT EXISTS Contratos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdPlan INT NOT NULL,
    IdCoach INT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaFin DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdPlan) REFERENCES Planes(Id),
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla Pagos
CREATE TABLE IF NOT EXISTS Pagos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdContrato INT NOT NULL,
    IdCoach INT NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL,
    FechaPago DATE NOT NULL,
    FOREIGN KEY (IdContrato) REFERENCES Contratos(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
);

-- Crear la tabla RutinasClientes
CREATE TABLE IF NOT EXISTS RutinasClientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    IdCliente INT NOT NULL,
    IdEjercicio INT NOT NULL,
    Series INT NOT NULL,
    Repeticiones INT NOT NULL,
    Dia VARCHAR(20) NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Clientes(Id) ON DELETE CASCADE,
    FOREIGN KEY (IdEjercicio) REFERENCES Ejercicios(Id),
    UNIQUE KEY unique_rutina_cliente (IdCliente, IdEjercicio, Dia)
);

-- Crear la tabla MisRutinas
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

INSERT INTO Horarios (IdCliente, DiaSemana, HoraInicio, HoraFin, IdCoach)
VALUES
(1, 'Lunes', '07:00', '09:00', 1),
(1, 'Martes', '08:00', '10:00', 1),
(1, 'Miércoles', '09:00', '11:00', 1),
(1, 'Jueves', '10:00', '12:00', 1);

INSERT INTO CategoriasEjercicios (Categoria)
VALUES
('Empuje'),
('Jalon'),
('Pierna');

INSERT INTO EvaluacionesFisicas (Id, IdCliente, IdCoach, FechaEval, Peso, PorcentGrasa, Notas)
VALUES
(1, 1, 1, '2024-12-05', 56, 15, 'Aumento de masa muscular'),
(2, 2, 1, '2024-12-05', 64, 18, 'Mantenimiento'),
(3, 3, 1, '2024-12-05', 80, 27, 'Disminuir grasa corporal'),
(4, 4, 1, '2024-12-05', 75, 22, 'Competencia');

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

INSERT INTO Ejercicios (Ejercicio, IdMusculoObjetivo, IdCategoriaEjercicio, IdCoach)
VALUES
('Press banca', 1, 1, 1),
('Peck Deck', 1, 1, 1),
('Press inclinado', 1, 1, 1),
('Press declinado', 1, 1, 1),
('Press con mancuernas', 1, 1, 1),
('Press francés', 2, 1, 1),
('Extensión trasnuca polea', 2, 1, 1),
('Extensión con soga', 2, 1, 1),
('Extensión con mancuernas', 2, 1, 1),
('Elevaciones laterales polea/máquina', 3, 1, 1),
('Elevaciones laterales mancuernas', 3, 1, 1),
('Press militar mancuernas/barra/máquina', 3, 1, 1),
('Remo con agarre amplio', 4, 2, 1),
('Peck Deck', 4, 2, 1),
('Jalon vertical', 4, 2, 1),
('Remo gironda', 4, 2, 1),
('Pull over', 4, 2, 1),
('Dominadas', 4, 2, 1),
('Dominadas asistidas', 4, 2, 1),
('Remo en máquina', 4, 2, 1),
('Curl de muñeca', 5, 2, 1),
('Curl de muñeca inverso', 5, 2, 1),
('Front lever', 5, 2, 1),
('Curl invertido', 5, 2, 1),
('Curl martillo', 5, 2, 1),
('Curl de Bicep', 6, 2, 1),
('Curl mesero', 6, 2, 1),
('Curl en máquina/polea', 6, 2, 1),
('Curl inclinado', 6, 2, 1),
('Curl araña', 6, 2, 1),
('Sentadilla Hack', 7, 3, 1),
('Sentadilla con barra', 7, 3, 1),
('Sentadilla en smith', 7, 3, 1),
('Búlgaras', 7, 3, 1),
('Extensiones de Cuadricep', 7, 3, 1),
('Prensa', 7, 3, 1),
('Curl acostado', 8, 3, 1),
('Curl sentado', 8, 3, 1),
('Curl de pie', 8, 3, 1),
('Peso muerto', 8, 3, 1),
('Elevaciones de pie', 9, 3, 1),
('Elevaciones sentado', 9, 3, 1),
('Hip thrust', 10, 3, 1),
('Patada de glúteo', 10, 3, 1),
('Búlgaras', 10, 3, 1);

INSERT INTO RutinasClientes (IdCliente, IdEjercicio, Series, Repeticiones, Dia)
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

INSERT INTO Planes (IdCoach, Plan, Duracion, Costo)
VALUES
(1, 'Básico', 1, 500),
(1, 'Intermedio', 3, 1400),
(1, 'Avanzado', 6, 2500),
(1, 'Premium', 12, 4000);

INSERT INTO Contratos (IdCliente, IdPlan, IdCoach, FechaInicio, FechaFin, Monto)
VALUES
(1, 1, 1, '2024-01-01', '2024-03-31', 500),
(2, 2, 1, '2024-02-01', '2024-04-30', 1400),
(3, 1, 1, '2024-03-01', '2024-05-31', 500),
(4, 3, 1, '2024-01-15', '2024-06-14', 2500);

INSERT INTO Pagos (IdContrato, IdCoach, Monto, FechaPago)
VALUES
(1, 1, 500, '2024-01-15'),
(2, 1, 1400, '2024-02-15'),
(3, 1, 500, '2024-03-15'),
(4, 1, 2500, '2024-01-15');