import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import loginRoutes from "./Routes/LogInRuta.js";
import clientesRoutes from "./Routes/ClientesRutas.js"; // Asegúrate de que el nombre del archivo sea correcto

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

// Ruta para el inicio de sesión

app.use("/", loginRoutes);
app.use("/clientes", clientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
