import ContratosModelo from "../Models/ContratosModelo.js";

const ContratosController = {
  obtenerContratos: async (req, res) => {
    try {
      const { idCoach } = req.query;
      console.log("IdCoach controller:", idCoach);
      if (!idCoach) {
        return res.status(400).json({ mensaje: "El idCoach es requerido" });
      }
      const contratos = await ContratosModelo.obtenerContratos(idCoach);
      res.status(200).json(contratos);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarContratos: async (req, res) => {
    try {
      console.log("req.body controllerContrato:", req.body);
      const { IdCoach, IdCliente, IdPlan, FechaInicio, FechaFin, Monto } =
        req.body;
      if (
        (!IdCoach, !IdCliente || !IdPlan || !FechaInicio || !FechaFin || !Monto)
      ) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const contratos = await ContratosModelo.agregarContratos(
        IdCoach,
        IdCliente,
        IdPlan,
        FechaInicio,
        FechaFin,
        Monto
      );
      res.status(200).json(contratos);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  eliminarContratos: async (req, res) => {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ mensaje: "El id es requerido" });
      }
      const contratos = await ContratosModelo.eliminarContratos(id);
      res.status(200).json(contratos);
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
};

export default ContratosController;
