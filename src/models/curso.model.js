// models/curso.Model.js
import { pool } from "../db.js";

const CursoModel = {
  async getAll() {
    const query = 'SELECT * FROM curso';
    const [rows] = await pool.query(query);
    return rows;
  },

  async getById(id) {
    const query = 'SELECT * FROM curso WHERE id_curso = $1';
    const values = [id];
    const [rows] = await pool.query(query, values);
    return rows[0];
  },

  async create(curso) {
    const query = 'INSERT INTO curso (id_docente, gestion, paralelo) VALUES ($1, $2, $3) RETURNING id_curso';
    const values = [curso.id_docente, curso.gestion, curso.paralelo];
    const result = await pool.query(query, values);
    return result.rows[0].id_curso; // Devuelve el ID del curso creado
  },

  async update(id, curso) {
    const query = 'UPDATE curso SET id_docente = $1, gestion = $2, paralelo = $3 WHERE id_curso = $4';
    const values = [curso.id_docente, curso.gestion, curso.paralelo, id];
    const result = await pool.query(query, values);
    return result.rowCount > 0; // Devuelve true si se actualizó al menos una fila
  },

  async delete(id) {
    const query = 'DELETE FROM curso WHERE id_curso = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount > 0; // Devuelve true si se eliminó al menos una fila
  }
};

export default CursoModel;
