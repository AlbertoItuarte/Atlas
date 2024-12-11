import { response } from "express";
import db from "../Config/db.js";

const ClientesModelo = {
  obtenerClientesPorIdCoach: async (id) => {
    try {
      const [results] = await db
        .promise()
        .query("SELECT * FROM Clientes WHERE idCoach = ?", [id]);
      // console.log("Clientes obtenidos de la base de datos:", results); // Agregar log para depuración
      return results;
    } catch (error) {
      // console.error(
      //   "Error al obtener los clientes por id del coach: " + error.message
      // );
      throw new Error(
        "Error al obtener los clientes por id del coach: " + error.message
      );
    }
  },
  editarCliente: async (id, cliente) => {
    // console.log("Editando cliente con ID en Modelo:", id); // Agregar log para depuración
    // console.log("Datos del cliente a editar en Modelo:", cliente); // Agregar log para depuración
    try {
      const { Id, Nombre, ApellidoP, ApellidoM, Correo, Celular, FechaNac } =
        cliente;
      // console.log("Log Modelo cliente id", cliente.Id);
      const [response] = await db.promise().query(
        `UPDATE Clientes 
          SET Nombre = ?, ApellidoP = ?, ApellidoM = ?, Correo = ?, Celular = ?, FechaNac = ? 
          WHERE Id = ?`,
        [Nombre, ApellidoP, ApellidoM, Correo, Celular, FechaNac, Id]
      );
      // console.log(response);
      // console.log("Cliente editado correctamente en Modelo"); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.error("Error en el modelo al editar un cliente:", error);
      throw new Error("Error al editar un cliente: " + error.message);
    }
  },
  buscarClientePorNombreModelo: async (nombre) => {
    try {
      console.log("Nombre del cliente en modelo:", nombre); // Agregar log para depuración
      const [results] = await db
        .promise()
        .query("SELECT * FROM Clientes WHERE Nombre = ?", [nombre]);
      console.log("Cliente encontrado por nombre:", results); // Agregar log para depuración
      return results;
    } catch (error) {
      console.error("Error al buscar cliente por nombre:", error);
      throw new Error("Error al buscar cliente por nombre: " + error.message);
    }
  },
  agregarCliente: async (cliente) => {
    try {
      const [response] = await db.promise().query(
        `INSERT INTO Clientes (Nombre, ApellidoP, ApellidoM, IdCoach, Correo, Celular, FechaNac) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          cliente.Nombre,
          cliente.ApellidoP,
          cliente.ApellidoM,
          cliente.IdCoach,
          cliente.Correo,
          cliente.Celular,
          cliente.FechaNac,
        ]
      );

      console.log(response);
      // console.log("Cliente agregado correctamente en Modelo"); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.error("Error al agregar un cliente:", error);

      throw new Error("Error al agregar un cliente: " + error.message);
    }
  },
  eliminarCliente: async (id) => {
    try {
      // console.log("ID del cliente a eliminar en modelo:", id); // Agregar log para depuración
      const [response] = await db
        .promise()
        .query("DELETE FROM Clientes WHERE Id = ?", [id]);
      // console.log("Cliente eliminado correctamente en Modelo", response); // Agregar log para depuración
      return true;
    } catch (error) {
      // console.log("Error al eliminar un cliente:", response);
      throw new Error("Error al eliminar un cliente: " + error.message);
    }
  },
  obtenerRutinas: async (id) => {
    try {
      // console.log("ID del cliente en modelo:", id); // Agregar log para depuración
      const [results] = await db.promise().query(
        `SELECT 
        Ejercicios.Ejercicio, 
        RutinasClientes.Series, 
        RutinasClientes.Repeticiones,
        RutinasClientes.Dia,
        Clientes.Nombre 
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
      // console.log("Rutinas del cliente:", results); // Agregar log para depuración
      return results;
    } catch (error) {
      // console.error("Error al obtener las rutinas del cliente:", error);
      throw new Error(
        "Error al obtener las rutinas del cliente: " + error.message
      );
    }
  },
};

export default ClientesModelo;
