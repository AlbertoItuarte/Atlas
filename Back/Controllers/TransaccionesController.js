import TransaccionesModelo from "../Models/TransaccionesModelo.js";

const TransaccionesController = {
  obtenerPlanes: async (req, res) => {
    try {
      //   console.log("Request:", req);
      const { id } = req.query;
      console.log("Id:", id);
      if (!id) {
        return res.status(400).json({ mensaje: "El id es requerido" });
      }
      const planes = await TransaccionesModelo.obtenerPlanes(id);
      res.status(200).json(planes);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  actualizarPlanes: async (req, res) => {
    try {
      console.log("Request:", req.body);
      const { IdPlan, id, Plan, Duracion, Costo } = req.body;
      if (!IdPlan || !id || !Plan || !Duracion || !Costo) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const planes = await TransaccionesModelo.actualizarPlanes(
        IdPlan,
        id,
        Plan,
        Duracion,
        Costo
      );
      res.status(200).json(planes);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  eliminarPlanes: async (req, res) => {
    try {
      const { id } = req.query;
      console.log("Request:", id);
      if (!id) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const planes = await TransaccionesModelo.eliminarPlanes(id);
      res.status(200).json(planes);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarPlanes: async (req, res) => {
    try {
      console.log("Request controller:", req.body);
      const { IdCoach, Plan, Duracion, Costo } = req.body;
      if (!IdCoach || !Plan || !Duracion || !Costo) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const planes = await TransaccionesModelo.agregarPlanes(
        IdCoach,
        Plan,
        Duracion,
        Costo
      );
      res.status(200).json(planes);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarPagos: async (req, res) => {
    try {
      console.log("Request controller:", req.body);
      const { IdContrato, Monto, FechaPago, IdCoach } = req.body;
      console.log("Datos controller:", IdContrato, Monto, FechaPago, IdCoach);
      if (!IdContrato || !Monto || !FechaPago || !IdCoach) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const pagos = await TransaccionesModelo.agregarPagos(
        IdContrato,
        Monto,
        FechaPago,
        IdCoach
      );
      res.status(200).json(pagos);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
};

export default TransaccionesController;
