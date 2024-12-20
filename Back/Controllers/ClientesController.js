import ClientesModelo from "../Models/ClientesModelo.js";

const ClientesController = {
  obtenerClientes: async (req, res) => {
    try {
      const { id } = req.query; // Obtener el id de los parámetros de la URL
      console.log("ID del coach controller:", id); // Agregar log para depuración
      if (!id) {
        res.status(400).json({ mensaje: "Falta el id del coach" });
        return;
      }
      const clientes = await ClientesModelo.obtenerClientesPorIdCoach(id);
      console.log("", clientes); // Agregar log para depuración
      if (clientes.length > 0) {
        res.status(200).json(clientes);
      } else {
        res.status(404).json({ mensaje: "No se encontraron clientes" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  editarCliente: async (req, res) => {
    try {
      const { id } = req.params; // ID del cliente desde los parámetros de la URL
      console.log("ID del cliente en controlador:", id); // Agregar log para depuración
      const cliente = req.body; // Nuevos datos del cliente
      // console.log("Editando en controlador: ", cliente);

      await ClientesModelo.editarCliente(id, cliente);
      res.status(200).json({ mensaje: "Cliente editado correctamente" });
    } catch (error) {
      // console.error("Error en el controlador al editar el cliente:", error);
      res
        .status(500)
        .json({ mensaje: "Error al editar el cliente", error: error.message });
    }
  },
  buscarClientePorNombre: async (req, res) => {
    try {
      const { nombre } = req.query; // Obtener el nombre de los parámetros de la URL
      console.log("Nombre del cliente en controlador:", nombre); // Agregar log para depuración
      if (!nombre) {
        res.status(400).json({ mensaje: "Falta el nombre del cliente" });
        return;
      }
      const cliente = await ClientesModelo.buscarClientePorNombreModelo(nombre);
      // console.log("Cliente encontrado:", cliente); // Agregar log para depuración
      if (cliente.length > 0) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ mensaje: "No se encontró el cliente" });
      }
    } catch (error) {
      // console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarCliente: async (req, res) => {
    try {
      const cliente = req.body; // Datos del nuevo cliente
      const result = await ClientesModelo.agregarCliente(cliente);
      if (result) {
        res.status(201).json({ mensaje: "Cliente agregado correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo agregar el cliente" });
      }
    } catch (error) {
      console.error("Error en el controlador al agregar el cliente:", error);
      res.status(500).json({
        mensaje: "Error al agregar el cliente",
        error: error.message,
      });
    }
  },
  obtenerRutinas: async (req, res) => {
    try {
      const { id } = req.query; // Obtener el id de los parámetros de la URL
      console.log("ID del cliente controller:", id); // Agregar log para depuración
      if (!id) {
        res.status(400).json({ mensaje: "Falta el id del cliente" });
        return;
      }
      const rutinas = await ClientesModelo.obtenerRutinas(id);
      console.log("Rutinas del cliente:", rutinas); // Agregar log para depuración
      if (rutinas.length > 0) {
        res.status(200).json(rutinas);
      } else {
        res.status(404).json({ mensaje: "No se encontraron rutinas" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  eliminarCliente: async (req, res) => {
    try {
      const { id } = req.query; // ID del cliente desde el cuerpo de la petición
      // console.log("ID del cliente en controlador:", id); // Agregar log para depuración
      await ClientesModelo.eliminarCliente(id);
      res.status(200).json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
      // console.error("Error en el controlador al eliminar el cliente:", error);
      res.status(500).json({
        mensaje: "Error al eliminar el cliente",
        error: error.message,
      });
    }
  },
  agregarEjercicio: async (req, res) => {
    try {
      const ejercicio = req.body; // Datos del nuevo ejercicio
      console.log("Ejercicio en controlador:", ejercicio); // Agregar log para depuración
      const result = await ClientesModelo.agregarEjercicio(ejercicio);
      if (result) {
        res.status(201).json({ mensaje: "Ejercicio agregado correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo agregar el ejercicio" });
      }
    } catch (error) {
      console.error("Error en el controlador al agregar el ejercicio:", error);
      res.status(500).json({
        mensaje: "Error al agregar el ejercicio",
        error: error.message,
      });
    }
  },
  obtenerEvaluaciones: async (req, res) => {
    try {
      const { id } = req.query; // Obtener el id de los parámetros de la URL
      console.log("ID del cliente controller:", id); // Agregar log para depuración
      if (!id) {
        res.status(400).json({ mensaje: "Falta el id del cliente" });
        return;
      }
      const evaluaciones = await ClientesModelo.obtenerEvaluaciones(id);
      console.log("Evaluaciones del cliente:", evaluaciones); // Agregar log para depuración
      if (evaluaciones.length > 0) {
        res.status(200).json(evaluaciones);
      } else {
        res.status(404).json({ mensaje: "No se encontraron evaluaciones" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  agregarEvaluacion: async (req, res) => {
    try {
      const evaluacion = req.body; // Datos de la nueva evaluación
      console.log("Evaluación en controlador:", evaluacion); // Agregar log para depuración
      const result = await ClientesModelo.agregarEvaluacion(evaluacion);
      if (result) {
        res.status(201).json({ mensaje: "Evaluación agregada correctamente" });
      } else {
        res.status(400).json({ mensaje: "No se pudo agregar la evaluación" });
      }
    } catch (error) {
      console.error("Error en el controlador al agregar la evaluación:", error);
      res.status(500).json({
        mensaje: "Error al agregar la evaluación",
        error: error.message,
      });
    }
  },
};

export default ClientesController;
