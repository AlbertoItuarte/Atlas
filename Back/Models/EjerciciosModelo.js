import db from "../Config/db.js";

const EjerciciosModelo = {
  obtenerTodosLosEjercicios: async (id) => {
    try {
      console.log("Obteniendo ejercicios para el coach con id en modelo:", id);
      const [response] = await db.promise().query(
        `
          SELECT 
            Ejercicios.*, 
            CategoriasEjercicios.Categoria, 
            MusculosObjetivos.MusculoObjetivo 
          FROM Ejercicios
          LEFT JOIN CategoriasEjercicios ON Ejercicios.IdCategoriaEjercicio = CategoriasEjercicios.Id
          LEFT JOIN MusculosObjetivos ON Ejercicios.IdMusculoObjetivo = MusculosObjetivos.Id
          WHERE Ejercicios.IdCoach = ?
        `,
        [id]
      );
      console.log(response);

      return response;
    } catch (error) {
      throw new Error("Error al obtener los ejercicios: " + error.message);
    }
  },
  obtenerMusculos: async (id) => {
    try {
      console.log("Obteniendo musculos en modelo de la categoria: ", id);
      const [response] = await db
        .promise()
        .query("SELECT * FROM MusculosObjetivos WHERE IdCategoria = ?", [id]);
      console.log(response);

      return response;
    } catch (error) {
      throw new Error("Error al obtener los musculos: " + error.message);
    }
  },
  obtenerCategorias: async () => {
    try {
      console.log("Obteniendo categorias en modelo");
      const [response] = await db
        .promise()
        .query("SELECT * FROM CategoriasEjercicios");
      console.log(response);

      return response;
    } catch (error) {
      throw new Error("Error al obtener las categorias: " + error.message);
    }
  },
  obtenerEjerciciosFiltrados: async (idCategoria, idMusculo, idCoach) => {
    try {
      console.log("Obteniendo ejercicios filtrados en modelo");
      const [response] = await db
        .promise()
        .query(
          "SELECT * FROM Ejercicios WHERE IdCategoriaEjercicio = ? AND IdMusculoObjetivo = ? AND IdCoach = ?",
          [idCategoria, idMusculo, idCoach]
        );
      console.log(response);

      return response;
    } catch (error) {
      throw new Error(
        "Error al obtener los ejercicios filtrados: " + error.message
      );
    }
  },
  agregarEjercicio: async (ejercicio) => {
    try {
      console.log("Agregando ejercicio en modelo:", ejercicio);
      const { Ejercicio, IdCategoriaEjercicio, IdMusculoObjetivo, IdCoach } =
        ejercicio;
      console.log("Agregando ejercicio en modelo:", ejercicio);

      const [response] = await db
        .promise()
        .query(
          "INSERT INTO Ejercicios (Ejercicio, IdCategoriaEjercicio, IdMusculoObjetivo, IdCoach) VALUES (?, ?, ?, ?)",
          [Ejercicio, IdCategoriaEjercicio, IdMusculoObjetivo, IdCoach]
        );
      console.log(response);

      return response;
    } catch (error) {
      throw new Error("Error al agregar el ejercicio: " + error.message);
    }
  },
  modificarEjercicio: async (ejercicio) => {
    try {
      console.log("Modificando ejercicio en modelo:", ejercicio);
      const { Id, Ejercicio } = ejercicio;
      const [response] = await db
        .promise()
        .query("UPDATE Ejercicios SET Ejercicio = ? WHERE Id = ?", [
          Ejercicio,
          // IdMusculoObjetivo,
          // IdCategoriaEjercicio,
          Id,
        ]);
      // , IdCategoriaEjercicio, IdMusculoObjetivo
      // , IdCategoriaEjercicio = ?, IdMusculoObjetivo = ?
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error al modificar el ejercicio: " + error.message);
    }
  },
  eliminarEjercicio: async (id) => {
    try {
      console.log("Eliminando ejercicio en modelo:", id);
      const [response] = await db
        .promise()
        .query("DELETE FROM Ejercicios WHERE Id = ?", [id]);
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("Error al eliminar el ejercicio: " + error.message);
    }
  },
};

export default EjerciciosModelo;
