import Curso from "../models/curso.model.js";


const listar = async (req, res) => {
  try {
    const cursos = await Curso.getAll();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los cursos" });
  }
};

const obtener = async (req, res) => {
  try {
    const id_curso = parseInt(req.params.id);
    if (isNaN(id_curso)) {
      return res.status(400).json({ error: "ID de curso inválido" });
    }
    const curso = await Curso.getById(id_curso);
    if (!curso) return res.status(404).json({ mensaje: "Curso no encontrado" });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el curso" });
  }
};

const crear = async (req, res) => {
  try {
    const { id_docente, gestion, paralelo } = req.body;
    if (!id_docente || !gestion || isNaN(paralelo)) {
      return res.status(400).json({ error: "Datos de curso inválidos" });
    }
    await Curso.create({ id_docente, gestion, paralelo });
    res.status(201).json({ mensaje: "Curso creado exitosamente" });
  } catch (err) {
    console.error("Error al crear el curso:", err);
    res.status(500).json({ error: "Error al crear el curso" });
  }
};

const actualizar = async (req, res) => {
  try {
    const id_curso = parseInt(req.params.id);
    const { id_docente, gestion, paralelo } = req.body;
    if (isNaN(id_curso) || !id_docente || !gestion || isNaN(paralelo)) {
      return res.status(400).json({ error: "Datos inválidos para actualizar curso" });
    }
    const actualizado = await Curso.update(id_curso, { id_docente, gestion, paralelo });
    if (!actualizado) {
      return res.status(404).json({ mensaje: "Curso no encontrado para actualizar" });
    }
    res.json({ mensaje: "Curso actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el curso" });
  }
};

const eliminar = async (req, res) => {
  try {
    const id_curso = parseInt(req.params.id);
    if (isNaN(id_curso)) {
      return res.status(400).json({ error: "ID de curso inválido" });
    }
    const eliminado = await Curso.delete(id_curso);
    if (!eliminado) {
      return res.status(404).json({ mensaje: "Curso no encontrado para eliminar" });
    }
    res.json({ mensaje: "Curso eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el curso" });
  }
};

export const cursoController = {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar
};

