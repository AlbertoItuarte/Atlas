import db from "../Config/db.js";

const HorarioModelo = {
  obtenerHorarios: async (id) => {
    try {
      console.log("Obtener horarios modelo:", id.idCoach);
      const [results] = await db.promise().query(
        `SELECT h.Id, h.IdCliente, c.Nombre AS NombreCliente, h.DiaSemana, h.HoraInicio, h.HoraFin 
         FROM Horarios h
         JOIN Clientes c ON h.IdCliente = c.Id
         WHERE h.IdCoach = ?`,
        [id.idCoach]
      );
      console.log("Horarios modelo:", results);
      return results;
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
      throw new Error("Error al obtener los horarios: " + error.message);
    }
  },
  agregarHorario: async (horario) => {
    try {
      const { IdCliente, DiaSemana, HoraInicio, HoraFin, IdCoach } = horario;
      console.log("Agregando horario:", horario);

      const [response] = await db.promise().query(
        `INSERT INTO Horarios (IdCliente, DiaSemana, HoraInicio, HoraFin, IdCoach) 
         VALUES (?, ?, ?, ?, ?)`,
        [IdCliente, DiaSemana, HoraInicio, HoraFin, IdCoach]
      );
      return response;
    } catch (error) {
      throw new Error("Error al agregar el horario: " + error.message);
    }
  },
  editarHorario: async (id, horario) => {
    try {
      const { DiaSemana, HoraInicio, HoraFin } = horario;
      const [response] = await db.promise().query(
        `UPDATE Horarios 
         SET DiaSemana = ?, HoraInicio = ?, HoraFin = ? 
         WHERE Id = ?`,
        [DiaSemana, HoraInicio, HoraFin, id]
      );
      return response;
    } catch (error) {
      throw new Error("Error al editar el horario: " + error.message);
    }
  },
  eliminarHorario: async (id) => {
    try {
      const [response] = await db
        .promise()
        .query(`DELETE FROM Horarios WHERE Id = ?`, [id]);
      return response;
    } catch (error) {
      throw new Error("Error al eliminar el horario: " + error.message);
    }
  },
};

export default HorarioModelo;
