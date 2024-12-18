import db from "../Config/db.js";

const MisRutinasModelo = {
  obtenerRutinas: async (id) => {
    try {
      const [results] = await db.promise().query(
        `SELECT 
            Ejercicios.Ejercicio,
            MisRutinas.Id,
            MisRutinas.Series,
            MisRutinas.Repeticiones,
            MisRutinas.Dia
          FROM
            MisRutinas
          JOIN
            Ejercicios
          ON
            MisRutinas.IdEjercicio = Ejercicios.Id
          WHERE 
            MisRutinas.IdCoach = ?`,
        [id]
      );
      console.log("Rutinas del coach modelo final:", results); // Agregar log para depuración
      return results;
    } catch (error) {
      throw new Error(
        "Error al obtener las rutinas del coach: " + error.message
      );
    }
  },
  agregarEjercicio: async (IdCoach, IdEjercicio, Series, Repeticiones, Dia) => {
    try {
      const [response] = await db
        .promise()
        .query(
          "INSERT INTO MisRutinas (IdCoach, IdEjercicio, Series, Repeticiones, Dia) VALUES (?, ?, ?, ?, ?)",
          [IdCoach, IdEjercicio, Series, Repeticiones, Dia]
        );
      return true;
    } catch (error) {
      throw new Error("Error al agregar un ejercicio: " + error.message);
    }
  },
  eliminarEjercicio: async (IdEjercicio) => {
    console.log("ID del ejercicio a eliminar modelo:", IdEjercicio); // Agregar log para depuración
    try {
      const [response] = await db
        .promise()
        .query("DELETE FROM MisRutinas WHERE Id = ?", [IdEjercicio]);
      return true;
    } catch (error) {
      throw new Error("Error al eliminar un ejercicio: " + error.message);
    }
  },
  modificarEjercicio: async (IdEjercicio, Series, Repeticiones) => {
    console.log(
      "Datos del ejercicio modelo:",
      IdEjercicio,
      Series,
      Repeticiones
    ); // Agregar log para depuración
    try {
      const [response] = await db
        .promise()
        .query(
          "UPDATE MisRutinas SET Series = ?, Repeticiones = ? WHERE Id = ? ",
          [Series, Repeticiones, IdEjercicio]
        );
      return true;
    } catch (error) {
      throw new Error("Error al modificar un ejercicio: " + error.message);
    }
  },
};

export default MisRutinasModelo;
