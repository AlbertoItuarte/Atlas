import HorarioModelo from "../Models/HorarioModelo.js";

const HorarioController = {
  obtenerHorarios: async (req, res) => {
    try {
      console.log("Obtener horarios controller: ", req.query);
      const horarios = await HorarioModelo.obtenerHorarios(req.query);
      if (horarios.length > 0) {
        res.status(200).json(horarios);
      } else {
        res.status(404).json({ mensaje: "No se encontraron horarios" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarHorario: async (req, res) => {
    try {
      const horario = req.body; // Datos del nuevo horario
      const result = await HorarioModelo.agregarHorario(horario);
      if (result) {
        res.status(201).json({ mensaje: "Horario agregado correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo agregar el horario" });
      }
    } catch (error) {
      console.error("Error en el controlador al agregar el horario:", error);
      res.status(500).json({
        mensaje: "Error al agregar el horario",
        error: error.message,
      });
    }
  },
  editarHorario: async (req, res) => {
    try {
      const { Id } = req.body; // ID del horario desde los parámetros de la URL
      const horario = req.body; // Nuevos datos del horario
      console.log("Editar horario:", Id, horario);
      const result = await HorarioModelo.editarHorario(Id, horario);
      if (result) {
        res.status(200).json({ mensaje: "Horario editado correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo editar el horario" });
      }
    } catch (error) {
      console.error("Error en el controlador al editar el horario:", error);
      res.status(500).json({
        mensaje: "Error al editar el horario",
        error: error.message,
      });
    }
  },
  eliminarHorario: async (req, res) => {
    console.log("Eliminar horario:", req.body);
    try {
      const { id } = req.body; // ID del horario desde los parámetros de la URL
      console.log("Eliminar horario controller:", id);
      const result = await HorarioModelo.eliminarHorario(id);
      if (result) {
        res.status(200).json({ mensaje: "Horario eliminado correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo eliminar el horario" });
      }
    } catch (error) {
      console.error("Error en el controlador al eliminar el horario:", error);
      res.status(500).json({
        mensaje: "Error al eliminar el horario",
        error: error.message,
      });
    }
  },
};

export default HorarioController;
