import db from "../Config/db.js";

const TransaccionesModelo = {
  obtenerPlanes: async (id) => {
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
};

export default TransaccionesModelo;
