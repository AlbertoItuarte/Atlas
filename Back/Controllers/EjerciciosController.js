import EjerciciosModelo from "../Models/EjerciciosModelo.js";

const EjerciciosController = {
  obtenerTodosLosEjercicios: async (req, res) => {
    try {
      const { id } = req.query;
      console.log(
        "Obteniendo ejercicios para el coach con id en controller:",
        id
      );
      const ejercicios = await EjerciciosModelo.obtenerTodosLosEjercicios(id);
      if (ejercicios.length > 0) {
        res.status(200).json(ejercicios);
      } else {
        res.status(404).json({ mensaje: "No se encontraron ejercicios" });
      }

      console.log("Ejercicios en controller: ", ejercicios);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
};

export default EjerciciosController;
