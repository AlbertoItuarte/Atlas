import express from "express";
import ClientesController from "../Controllers/ClientesController.js";

const router = express.Router();

// Define las rutas y asigna los controladores
router.get("/", ClientesController.obtenerClientes);

// Agregar la ruta para editar un cliente con el ID en los parámetros de la URL
// router.put("/editar/:id", ClientesController.editarCliente);

router.put("/editar", ClientesController.editarCliente);

// Agregar la ruta para buscar un cliente por nombre
router.get("/buscar", ClientesController.buscarClientePorNombre);

// Añadir la ruta para buscar agregar cliente
router.post("/agregar", ClientesController.agregarCliente);

// Añadir la ruta para eliminar cliente
router.delete("/eliminar", ClientesController.eliminarCliente);

//Ruta para obtener rutinas de un cliente
router.get("/rutinas", ClientesController.obtenerRutinas);

router.post("/agregarejercicio", ClientesController.agregarEjercicio);

router.get("/evaluaciones", ClientesController.obtenerEvaluaciones);

router.post("/agregarevaluacion", ClientesController.agregarEvaluacion);

// router.post("/agregarevaluacion", ClientesController.agregarEvaluacion);

// router.delete("/eliminarevaluacion", ClientesController.eliminarEvaluacion);

export default router;
