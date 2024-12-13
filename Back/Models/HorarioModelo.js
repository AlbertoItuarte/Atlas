import db from "../Config/db.js";

const HorarioModelo = {
  obtenerHorarios: async () => {
    try {
      const [results] = await db.promise().query(
        `SELECT IdCliente, DiaSemana, HoraInicio, HoraFin 
         FROM Horarios`
      );
      return results;
    } catch (error) {
      throw new Error("Error al obtener los horarios: " + error.message);
    }
  },
  agregarHorario: async (horario) => {
    try {
      const { IdCliente, DiaSemana, HoraInicio, HoraFin } = horario;
      const [response] = await db.promise().query(
        `INSERT INTO Horarios (IdCliente, DiaSemana, HoraInicio, HoraFin) 
         VALUES (?, ?, ?, ?)`,
        [IdCliente, DiaSemana, HoraInicio, HoraFin]
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
