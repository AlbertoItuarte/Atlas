import RutinasClientesModelo from "../Models/RutinasClientesModelo.js";

const RutinasClientesControlador = {
  obtenerRutinas: async (req, res) => {
    try {
      const { id } = req.query; // Obtener el id de los parámetros de la URL
      console.log("ID del cliente controller:", id); // Agregar log para depuración
      if (!id) {
        res.status(400).json({ mensaje: "Falta el id del cliente" });
        return;
      }
      const rutinas = await RutinasClientesModelo.obtenerRutinas(id);
      console.log("Rutinas del cliente:", rutinas); // Agregar log para depuración
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
      const { IdCliente, IdEjercicio, Series, Repeticiones, Dia } = req.body;
      console.log("Datos del ejercicio Controlador:", req.body); // Agregar log para depuración
      if (!IdCliente || !IdEjercicio || !Series || !Repeticiones || !Dia) {
        res.status(400).json({ mensaje: "Faltan datos" });
        return;
      }
      const resultado = await RutinasClientesModelo.agregarEjercicio(
        IdCliente,
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
      const resultado = await RutinasClientesModelo.eliminarEjercicio(
        IdEjercicio
      );
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
      const { IdEjercicio, IdCliente, Series, Repeticiones, Dia } = req.body;
      console.log("ID del ejercicio a modificar controlador:", IdEjercicio); // Agregar log para depuración
      console.log("Datos del ejercicio controlador 2:", req.body); // Agregar log para depuración
      if (!IdCliente || !IdEjercicio || !Series || !Repeticiones || !Dia) {
        res.status(400).json({ mensaje: "Faltan datos" });
        return;
      }
      const resultado = await RutinasClientesModelo.modificarEjercicio(
        IdCliente,
        IdEjercicio,
        Series,
        Repeticiones,
        Dia
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
export default RutinasClientesControlador;
