import { Router } from "express";
import TransaccionesController from "../Controllers/TransaccionesController.js";

const router = Router();

router.get("/planes", TransaccionesController.obtenerPlanes);

router.post("/agregar", TransaccionesController.agregarPlanes);

router.put("/actualizar", TransaccionesController.actualizarPlanes);

router.delete("/eliminar", TransaccionesController.eliminarPlanes);

router.post("/pagos", TransaccionesController.agregarPagos);

export default router;
