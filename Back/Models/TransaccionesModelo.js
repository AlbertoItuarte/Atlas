import db from "../Config/db.js";

const TransaccionesModelo = {
  obtenerPlanes: async (id) => {
    console.log("Id modelo:", id);
    try {
      const [planes] = await db
        .promise()
        .query("SELECT * FROM planes WHERE IdCoach = ?", [id]);
      return planes;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  },
  actualizarPlanes: async (IdPlan, id, Plan, Duracion, Costo) => {
    try {
      const [planes] = await db
        .promise()
        .query(
          "UPDATE planes SET Plan = ?, Duracion = ?, Costo = ? WHERE Id = ? AND IdCoach = ?",
          [Plan, Duracion, Costo, IdPlan, id]
        );
      return planes;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  },
  eliminarPlanes: async (id) => {
    try {
      // Primero eliminar los registros relacionados en la tabla contratos
      await db.promise().query("DELETE FROM contratos WHERE IdPlan = ?", [id]);

      // Luego eliminar el registro en la tabla planes
      const [planes] = await db
        .promise()
        .query("DELETE FROM planes WHERE id = ?", [id]);
      return planes;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  },
  agregarPlanes: async (id, Plan, Duracion, Costo) => {
    try {
      console.log("Datos:", id, Plan, Duracion, Costo);
      const [planes] = await db
        .promise()
        .query(
          "INSERT INTO planes (IdCoach, Plan, Duracion, Costo) VALUES (?, ?, ?, ?)",
          [id, Plan, Duracion, Costo]
        );
      return planes;
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  },
  agregarPagos: async (IdContrato, Monto, FechaPago, IdCoach) => {
    console.log(
      "Datos modelo agregarPago1:",
      IdContrato,
      Monto,
      FechaPago,
      IdCoach
    );
    try {
      console.log(
        "Datos modelo agregarPago:",
        IdContrato,
        Monto,
        FechaPago,
        IdCoach
      );
      const [result] = await db
        .promise()
        .query(
          "INSERT INTO pagos (IdContrato, Monto, FechaPago, IdCoach) VALUES (?, ?, ?, ?)",
          [IdContrato, Monto, FechaPago, IdCoach]
        );
      console.log("Datos modelo agregarPago2:", result);
      return { id: result.insertId, ...result };
    } catch (error) {
      console.error("Error en el servidor:", error);
      return { mensaje: "Error en el servidor", error: error.message };
    }
  },
};

export default TransaccionesModelo;
