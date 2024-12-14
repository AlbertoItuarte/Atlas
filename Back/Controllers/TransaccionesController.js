import TransaccionesModelo from "../Models/TransaccionesModelo.js";

const TransaccionesController = {
  obtenerPlanes: async (req, res) => {
    try {
      //   console.log("Request:", req);
      const { id } = req.params;
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
};

export default TransaccionesController;
