import mysql from "mysql2";

const openDb = mysql.createConnection({
  host: "localhost",
  user: "root", // Reemplaza con tu usuario de MySQL
  password: "root", // Reemplaza con tu contraseña de MySQL
  database: "atlas", // Reemplaza con el nombre de tu base de datos
});

openDb.connect((error) => {
  if (error) {
    console.error("Error de conexión a la base de datos:", error.message);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

export default openDb;
