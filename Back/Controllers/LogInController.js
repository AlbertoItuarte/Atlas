import LoginModelo from "../Models/LoginModelo.js";

const LogInController = {
  autenticarUsuario: async (req, res) => {
    const { usuario, password } = req.body;
    try {
      const coach = await LoginModelo.obtenerUsuarioPorUsuario(usuario);
      console.log(coach.Usuario);
      console.log("Login controller");
      if (coach) {
        console.log(coach.Password);
        if (password === coach.Password) {
          res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            id: coach.id,
            usuario: coach.Usuario,
            password: coach.Password,
          });
          console.log("Inicio de sesión exitoso: " + coach.Usuario);
        } else {
          console.log("Contraseña incorrecta");
          res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }
      } else {
        res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error en el servidor:", error);
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
  registrarUsuario: async (req, res) => {
    console.log("Datos controller:", req.body);
    try {
      const { Usuario, Password } = req.body;
      if (!Usuario || !Password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
      }
      const usuario = await LoginModelo.registrarUsuario(Usuario, Password);
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error en el servidor", error: error.message });
    }
  },
};

export default LogInController;
