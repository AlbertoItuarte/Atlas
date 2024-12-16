import db from "../Config/db.js";

const ContratosModelo = {
  obtenerContratos: async (IdCoach) => {
    try {
      console.log("IdCoach modelo:", IdCoach);
      const [contratos] = await db.promise().query(
        `
        SELECT 
          Contratos.Id,
          Clientes.Nombre AS NombreCliente,
          Clientes.ApellidoP AS ApellidoPCliente,
          Planes.Plan AS NombrePlan,
          Contratos.FechaInicio,
          Contratos.FechaFin,
          Contratos.Monto
        FROM 
          Contratos
        JOIN 
          Clientes ON Contratos.IdCliente = Clientes.Id
        JOIN 
          Planes ON Contratos.IdPlan = Planes.Id
        WHERE 
          Clientes.IdCoach = ?
      `,
        [IdCoach]
      );
      return contratos;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return { mensaje: "Error en el servidor", error: error.message };
    }
  },
  agregarContratos: async (
    IdCoach,
    IdCliente,
    IdPlan,
    FechaInicio,
    FechaFin,
    Monto
  ) => {
    try {
      const [result] = await db
        .promise()
        .query(
          `INSERT INTO Contratos (IdCoach, IdCliente, IdPlan, FechaInicio, FechaFin, Monto) VALUES (?, ?, ?, ?, ?, ?)`,
          [IdCoach, IdCliente, IdPlan, FechaInicio, FechaFin, Monto]
        );
      return { id: result.insertId, ...result };
    } catch (error) {
      console.error("Error en el servidor:", error);
      return { mensaje: "Error en el servidor", error: error.message };
    }
  },
  eliminarContratos: async (id) => {
    try {
      const [result] = await db
        .promise()
        .query(`DELETE FROM Contratos WHERE Id = ?`, [id]);
      return result;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return { mensaje: "Error en el servidor", error: error.message };
    }
  },
};

export default ContratosModelo;
