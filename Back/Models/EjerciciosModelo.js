import db from "../Config/db.js";

const EjerciciosModelo = {
  obtenerTodosLosEjercicios: async (id) => {
    try {
      console.log("Obteniendo ejercicios para el coach con id en modelo:", id);
      const [response] = await db
        .promise()
        .query("SELECT * FROM Ejercicios WHERE IdCoach = ?", [id]);
      console.log(response);

      return response;
    } catch (error) {
      throw new Error("Error al obtener los ejercicios: " + error.message);
    }
  },
};

export default EjerciciosModelo;
