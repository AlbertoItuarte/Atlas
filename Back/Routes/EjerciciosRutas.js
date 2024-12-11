import expres from "express";
import EjerciciosController from "../Controllers/EjerciciosController.js";

const router = expres.Router();

router.get("/", EjerciciosController.obtenerTodosLosEjercicios);

export default router;
