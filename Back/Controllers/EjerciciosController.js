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
  obtenerMusculos: async (req, res) => {
    try {
      console.log("Obteniendo musculos controller", req.query);
      const { IdCategoriaEjercicio } = req.query;
      const musculos = await EjerciciosModelo.obtenerMusculos(
        IdCategoriaEjercicio
      );
      if (musculos.length > 0) {
        res.status(200).json(musculos);
      } else {
        res.status(404).json({ mensaje: "No se encontraron musculos" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  obtenerCategorias: async (req, res) => {
    console.log("Obteniendo categorias", req.query);
    try {
      console.log("Obteniendo categorias", req.query);
      const categorias = await EjerciciosModelo.obtenerCategorias();
      if (categorias.length > 0) {
        res.status(200).json(categorias);
      } else {
        res.status(404).json({ mensaje: "No se encontraron categorias" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  obtenerEjerciciosFiltrados: async (req, res) => {
    try {
      console.log("Obteniendo ejercicios filtrados", req.query);
      const { IdCategoriaEjercicio, IdMusculoObjetivo } = req.query;
      const ejercicios = await EjerciciosModelo.obtenerEjerciciosFiltrados(
        IdCategoriaEjercicio,
        IdMusculoObjetivo
      );
      if (ejercicios.length > 0) {
        res.status(200).json(ejercicios);
      } else {
        res
          .status(404)
          .json({ mensaje: "No se encontraron ejercicios controller" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
};

export default EjerciciosController;
