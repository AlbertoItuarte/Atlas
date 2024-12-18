import express from "express";
import MisRutinasControlador from "../Controllers/MisRutinasControlador.js";

const router = express.Router();

router.get("/", MisRutinasControlador.obtenerRutinas);

router.post("/agregar", MisRutinasControlador.agregarEjercicio);

router.delete("/eliminar", MisRutinasControlador.eliminarEjercicio);

router.put("/modificar", MisRutinasControlador.modificarEjercicio);

export default router;
