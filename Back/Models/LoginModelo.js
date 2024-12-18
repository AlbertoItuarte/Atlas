import db from "../Config/db.js";

const LoginModelo = {
  obtenerUsuarioPorUsuario: async (usuario) => {
    try {
      console.log("Iniciando la consulta para el usuario:", usuario);
      const [results] = await db
        .promise()
        .query("SELECT id, Usuario, Password FROM Coaches WHERE Usuario = ?", [
          usuario,
        ]);

      console.log("Resultados de la consulta: ", results);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error(
        "Error al obtener el usuario por Usuario: " + error.message
      );
      throw new Error(
        "Error al obtener el usuario por Usuario: " + error.message
      );
    }
  },
  registrarUsuario: async (Usuario, Password) => {
    try {
      console.log("Registrando usuario: ", Usuario);
      console.log("Registrando contraseña: ", Password);
      const [results] = await db
        .promise()
        .query("INSERT INTO Coaches (Usuario, Password) VALUES (?, ?)", [
          Usuario,
          Password,
        ]);
      console.log("Usuario registrado correctamente");
      return results;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        console.error("Usuario ya registrado");
        throw new Error("Usuario ya registrado");
      }
      console.error("Error al registrar el usuario: " + error.message);
    }
  },
};

export default LoginModelo;
