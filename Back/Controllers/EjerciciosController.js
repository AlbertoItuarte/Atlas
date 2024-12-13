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
      const { IdCategoriaEjercicio, IdMusculoObjetivo, IdCoach } = req.query;
      const ejercicios = await EjerciciosModelo.obtenerEjerciciosFiltrados(
        IdCategoriaEjercicio,
        IdMusculoObjetivo,
        IdCoach
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
  agregarEjercicio: async (req, res) => {
    try {
      console.log("Agregando ejercicio controller", req.body);
      const ejercicio = req.body;
      const nuevoEjercicio = await EjerciciosModelo.agregarEjercicio(ejercicio);
      if (nuevoEjercicio) {
        res.status(201).json(nuevoEjercicio);
      } else {
        res.status(400).json({ mensaje: "Error al agregar el ejercicio" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  modificarEjercicio: async (req, res) => {
    try {
      console.log("Modificando ejercicio controller", req.body);
      const ejercicio = req.body;
      const ejercicioModificado = await EjerciciosModelo.modificarEjercicio(
        ejercicio
      );
      if (ejercicioModificado) {
        res.status(200).json(ejercicioModificado);
      } else {
        res.status(400).json({ mensaje: "Error al modificar el ejercicio" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  eliminarEjercicio: async (req, res) => {
    try {
      console.log("Eliminando ejercicio controller", req.query);
      const { id } = req.query;
      const ejercicioEliminado = await EjerciciosModelo.eliminarEjercicio(id);
      if (ejercicioEliminado) {
        res.status(200).json(ejercicioEliminado);
      } else {
        res.status(400).json({ mensaje: "Error al eliminar el ejercicio" });
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
