import { Router } from "express";
import TransaccionesController from "../Controllers/TransaccionesController.js";

const router = Router();

router.get("/planes", TransaccionesController.obtenerPlanes);

// router.post("/planes", TransaccionesController.actualizarPlanes);

// router.put("/planes", TransaccionesController.actualizarPlanes);

// router.delete("/planes", TransaccionesController.eliminarPlanes);

// router.get("/pagos", TransaccionesController.obtenerPagos);

// router.post("/pagos", TransaccionesController.actualizarPagos);

// router.get("/contratos", TransaccionesController.obtenerContratos);

// router.post("/contratos", TransaccionesController.actualizarContratos);

export default router;
