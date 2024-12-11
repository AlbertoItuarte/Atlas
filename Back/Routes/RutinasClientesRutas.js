import expres from "express";
import RutinasClientes from "../Controllers/RutinasClientesControlador.js";

const router = expres.Router();

router.get("/", RutinasClientes.obtenerRutinas);

router.post("/agregar", RutinasClientes.agregarEjercicio);

router.delete("/eliminar", RutinasClientes.eliminarEjercicio);

router.put("/modificar", RutinasClientes.modificarEjercicio);

export default router;
