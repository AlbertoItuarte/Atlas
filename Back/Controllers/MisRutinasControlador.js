import MisRutinasModelo from "../Models/MisRutinasModelo.js";

const MisRutinasControlador = {
  obtenerRutinas: async (req, res) => {
    console.log("ID del coach controlador:", req.query); // Agregar log para depuración
    try {
      const { id } = req.query; // Obtener el id de los parámetros de la URL
      console.log("ID del coach controller acá:", id); // Agregar log para depuración
      if (!id) {
        res.status(400).json({ mensaje: "Falta el id del coach" });
        return;
      }
      const rutinas = await MisRutinasModelo.obtenerRutinas(id);
      console.log("Rutinas del coach:", rutinas); // Agregar log para depuración
      if (rutinas.length > 0) {
        res.status(200).json(rutinas);
      } else {
        res.status(404).json({ mensaje: "No se encontraron rutinas" });
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
      const { IdCoach, IdEjercicio, Series, Repeticiones, Dia } = req.body;
      console.log("Datos del ejercicio Controlador:", req.body); // Agregar log para depuración
      if (!IdCoach || !IdEjercicio || !Series || !Repeticiones || !Dia) {
        res.status(400).json({ mensaje: "Faltan datos" });
        return;
      }
      const resultado = await MisRutinasModelo.agregarEjercicio(
        IdCoach,
        IdEjercicio,
        Series,
        Repeticiones,
        Dia
      );
      if (resultado) {
        res.status(201).json({ mensaje: "Ejercicio agregado correctamente" });
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
  eliminarEjercicio: async (req, res) => {
    console.log("Datos del ejercicio query eliminar:", req.query); // Agregar log para depuración
    try {
      const { IdEjercicio } = req.query;
      console.log("ID del ejercicio a eliminar controlador:", IdEjercicio); // Agregar log para depuración
      if (!IdEjercicio) {
        res.status(400).json({ mensaje: "Falta el ID del ejercicio" });
        return;
      }
      const resultado = await MisRutinasModelo.eliminarEjercicio(IdEjercicio);
      if (resultado) {
        res.status(200).json({ mensaje: "Ejercicio eliminado correctamente" });
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
  modificarEjercicio: async (req, res) => {
    console.log("Datos del ejercicio controlador modificar:", req.body); // Agregar log para depuración
    try {
      const { IdEjercicio, Series, Repeticiones } = req.body;
      console.log("ID del ejercicio a modificar controlador:", IdEjercicio); // Agregar log para depuración
      console.log("Datos del ejercicio controlador 2:", req.body); // Agregar log para depuración
      if (!IdEjercicio || !Series || !Repeticiones) {
        res.status(400).json({ mensaje: "Faltan datos" });
        return;
      }
      const resultado = await MisRutinasModelo.modificarEjercicio(
        IdEjercicio,
        Series,
        Repeticiones
      );
      if (resultado) {
        res.status(200).json({ mensaje: "Ejercicio modificado correctamente" });
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
};

export default MisRutinasControlador;
