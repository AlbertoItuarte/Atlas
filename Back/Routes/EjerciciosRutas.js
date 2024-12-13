import expres from "express";
import EjerciciosController from "../Controllers/EjerciciosController.js";

const router = expres.Router();

router.get("/", EjerciciosController.obtenerTodosLosEjercicios);

router.put("/modificar", EjerciciosController.modificarEjercicio);

router.delete("/eliminar", EjerciciosController.eliminarEjercicio);

router.get("/musculos", EjerciciosController.obtenerMusculos);

router.get("/categorias", EjerciciosController.obtenerCategorias);

router.get("/filtrados", EjerciciosController.obtenerEjerciciosFiltrados);

router.post("/agregar", EjerciciosController.agregarEjercicio);

export default router;
