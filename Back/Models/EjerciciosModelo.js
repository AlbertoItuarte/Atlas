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
  obtenerEjerciciosFiltrados: async (idCategoria, idMusculo) => {
    try {
      console.log("Obteniendo ejercicios filtrados en modelo");
      const [response] = await db
        .promise()
        .query(
          "SELECT * FROM Ejercicios WHERE IdCategoriaEjercicio = ? AND IdMusculoObjetivo = ?",
          [idCategoria, idMusculo]
        );
      console.log(response);

      return response;
    } catch (error) {
      throw new Error(
        "Error al obtener los ejercicios filtrados: " + error.message
      );
    }
  },
};

export default EjerciciosModelo;
