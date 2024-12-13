import express from "express";
import HorarioController from "../Controllers/HorarioController.js";

const router = express.Router();

// Ruta para obtener horarios filtrados por día
router.get("/", HorarioController.obtenerHorarios);

// Ruta para agregar un nuevo horario
router.post("/agregar", HorarioController.agregarHorario);

// Ruta para editar un horario existente
router.put("/editar", HorarioController.editarHorario);

// Ruta para eliminar un horario
router.delete("/eliminar", HorarioController.eliminarHorario);

export default router;
