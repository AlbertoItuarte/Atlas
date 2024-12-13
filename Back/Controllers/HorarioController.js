import HorarioModelo from "../Models/HorarioModelo.js";

const HorarioController = {
  obtenerHorarios: async (req, res) => {
    try {
      const { dia } = req.query; // Obtener el día de los parámetros de la URL
      const horarios = await HorarioModelo.obtenerHorarios();
      const horariosFiltrados = horarios.filter(
        (horario) => horario.DiaSemana === dia
      );
      if (horariosFiltrados.length > 0) {
        res.status(200).json(horariosFiltrados);
      } else {
        res
          .status(404)
          .json({
            mensaje: "No se encontraron horarios para el día especificado",
          });
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
      const { id } = req.params; // ID del horario desde los parámetros de la URL
      const horario = req.body; // Nuevos datos del horario
      const result = await HorarioModelo.editarHorario(id, horario);
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
    try {
      const { id } = req.params; // ID del horario desde los parámetros de la URL
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
