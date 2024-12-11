import db from "../Config/db.js";

const RutinasClientesModelo = {
  obtenerRutinas: async (id) => {
    try {
      // console.log("ID del cliente en modelo:", id); // Agregar log para depuración
      const [results] = await db.promise().query(
        `SELECT 
            Ejercicios.Id,
            Ejercicios.Ejercicio, 
            RutinasClientes.Series, 
            RutinasClientes.Repeticiones,
            RutinasClientes.Dia,
            Clientes.Nombre,
            Clientes.Id as IdCliente
          FROM 
            RutinasClientes 
          JOIN 
            Ejercicios 
          ON 
            RutinasClientes.IdEjercicio = Ejercicios.Id 
          JOIN
            Clientes
          ON
            RutinasClientes.IdCliente = Clientes.Id
          WHERE 
            RutinasClientes.IdCliente = ?`,
        [id]
      );
      console.log("Rutinas del cliente modelo final:", results); // Agregar log para depuración
      return results;
    } catch (error) {
      // console.error("Error al obtener las rutinas del cliente:", error);
      throw new Error(
        "Error al obtener las rutinas del cliente: " + error.message
      );
    }
  },
  agregarEjercicio: async (
    idCliente,
    idEjercicio,
    series,
    Repeticiones,
    dia
  ) => {
    try {
      const [response] = await db
        .promise()
        .query(
          "INSERT INTO RutinasClientes (IdCliente, IdEjercicio, Series, Repeticiones, Dia) VALUES (?, ?, ?, ?, ?)",
          [idCliente, idEjercicio, series, Repeticiones, dia]
        );
      // console.log("Ejercicio agregado correctamente en Modelo", response); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.error("Error al agregar un ejercicio:", error);
      throw new Error("Error al agregar un ejercicio: " + error.message);
    }
  },
  eliminarEjercicio: async (IdEjercicio) => {
    try {
      console.log(
        "IdEjercicio del ejercicio a eliminar en modelo:",
        IdEjercicio
      ); // Agregar log para depuración
      const [response] = await db
        .promise()
        .query("DELETE FROM RutinasClientes WHERE IdEjercicio = ?", [
          IdEjercicio,
        ]);
      console.log("Ejercicio eliminado correctamente en Modelo", response); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.log("Error al eliminar un ejercicio:", response);
      throw new Error("Error al eliminar un ejercicio: " + error.message);
    }
  },
  modificarEjercicio: async (
    IdCliente,
    IdEjercicio,
    Series,
    Repeticiones,
    Dia
  ) => {
    console.log("Series Modelo:", Series); // Agregar log para depuración
    console.log("Repeticiones Modelo:", Repeticiones); // Agregar log para depuración
    console.log("Día Modelo:", Dia); // Agregar log para depuración
    console.log("ID del cliente Modelo:", IdCliente); // Agregar log para depuración
    console.log("ID del ejercicio Modelo:", IdEjercicio); // Agregar log para depuración
    try {
      const [response] = await db
        .promise()
        .query(
          "UPDATE RutinasClientes SET Series = ?, Repeticiones = ?, Dia = ? WHERE IdCliente = ? AND IdEjercicio = ? AND Dia = ?",
          [Series, Repeticiones, Dia, IdCliente, IdEjercicio, Dia]
        );
      console.log("Ejercicio modificado correctamente en Modelo", response); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.log("Error al modificar un ejercicio:", error);
      throw new Error("Error al modificar un ejercicio: " + error.message);
    }
  },
};

export default RutinasClientesModelo;
