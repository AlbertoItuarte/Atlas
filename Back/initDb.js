import openDb from "./Config/db.js";

const initDb = async () => {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Coaches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      Usuario TEXT NOT NULL,
      Password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Clientes (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Nombre TEXT NOT NULL,
      ApellidoP TEXT NOT NULL,
      ApellidoM TEXT NOT NULL,
      IdCoach INTEGER,
      Correo TEXT NOT NULL,
      Celular TEXT,
      FechaNac DATE,
      FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
    );

    CREATE TABLE IF NOT EXISTS EvaluacionesFisicas (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCliente INTEGER NOT NULL,
      FechaEval DATE NOT NULL,
      Peso DECIMAL(5,2),
      PorcentGrasa DECIMAL(5,2),
      Notas TEXT,
      FOREIGN KEY (IdCliente) REFERENCES Clientes(Id)
    );

    CREATE TABLE IF NOT EXISTS CategoriasEjercicios (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Categoria TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS MusculosObjetivos (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      MusculoObjetivo TEXT NOT NULL,
      IdCategoria INTEGER NOT NULL,
      FOREIGN KEY (IdCategoria) REFERENCES CategoriasEjercicios(Id)
    );

    CREATE TABLE IF NOT EXISTS Ejercicios (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      Ejercicio TEXT NOT NULL,
      IdMusculoObjetivo INTEGER,
      IdCategoriaEjercicio INTEGER,
      FOREIGN KEY (IdMusculoObjetivo) REFERENCES MusculosObjetivos(Id),
      FOREIGN KEY (IdCategoriaEjercicio) REFERENCES CategoriasEjercicios(Id)
    );

    CREATE TABLE IF NOT EXISTS Horarios (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCliente INTEGER NOT NULL,
      DiaSemana TEXT NOT NULL,
      HoraInicio TIME NOT NULL,
      HoraFin TIME NOT NULL,
      FOREIGN KEY (IdCliente) REFERENCES Clientes(Id)
    );

    CREATE TABLE IF NOT EXISTS Planes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCoach INTEGER NOT NULL,
      Plan TEXT NOT NULL,
      Duración INTEGER NOT NULL,
      Costo DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (IdCoach) REFERENCES Coaches(id)
    );

    CREATE TABLE IF NOT EXISTS Contratos (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCliente INTEGER NOT NULL,
      IdPlan INTEGER NOT NULL,
      FechaInicio DATE NOT NULL,
      FechaFin DATE NOT NULL,
      Monto DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (IdCliente) REFERENCES Clientes(Id),
      FOREIGN KEY (IdPlan) REFERENCES Planes(id)
    );

    CREATE TABLE IF NOT EXISTS Pagos (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdContrato INTEGER NOT NULL,
      Monto DECIMAL(10, 2) NOT NULL,
      FechaPago DATE NOT NULL,
      FOREIGN KEY (IdContrato) REFERENCES Contratos(Id)
    );

    CREATE TABLE IF NOT EXISTS RutinasClientes (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCliente INTEGER NOT NULL,
      IdEjercicio INTEGER NOT NULL,
      Series INTEGER NOT NULL,
      Repeticiones INTEGER NOT NULL,
      FOREIGN KEY (IdCliente) REFERENCES Clientes(Id),
      FOREIGN KEY (IdEjercicio) REFERENCES Ejercicios(Id),
      UNIQUE(IdCliente, IdEjercicio)
    );

    CREATE TABLE IF NOT EXISTS MisRutinas (
      Id INTEGER PRIMARY KEY AUTOINCREMENT,
      IdCoach INTEGER NOT NULL,
      IdEjercicio INTEGER NOT NULL,
      Series INTEGER NOT NULL,
      Repeticiones INTEGER NOT NULL,
      FOREIGN KEY (IdCoach) REFERENCES Coaches(id),
      FOREIGN KEY (IdEjercicio) REFERENCES Ejercicios(Id)
    );

    INSERT INTO Coaches (Usuario, Password) VALUES ('Yisus', '
      "123456",
      10
    )}');
  `);

  console.log("Base de datos inicializada");
};

initDb().catch((err) => {
  console.error("Error al inicializar la base de datos:", err);
});
