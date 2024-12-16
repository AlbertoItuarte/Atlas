import ContratosController from "../Controllers/ContratosController.js";
import { Router } from "express";

const router = Router();

router.get("/", ContratosController.obtenerContratos);

router.post("/agregar", ContratosController.agregarContratos);

router.delete("/eliminar", ContratosController.eliminarContratos);

export default router;
