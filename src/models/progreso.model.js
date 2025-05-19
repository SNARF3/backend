import { pool } from '../db.js';

export const ProgresoModel = {
  // Crear registro principal de progreso
  async createProgreso(id_estudiante, id_curso, id_tutor) {
    const { rows } = await pool.query(
      `INSERT INTO progreso 
      (id_estudiante, id_curso, id_tutor, estado_progreso) 
      VALUES ($1, $2, $3, 1) 
      RETURNING id_progreso`,
      [id_estudiante, id_curso, id_tutor]
    );
    return rows[0].id_progreso;
  },

  // Perfil
  async createPerfil(perfilData) {
    const { id_progreso, perfil, fecha_entrega, estado_perfil, comentario_perfil, descripcion } = perfilData;
    await pool.query(
      `INSERT INTO perfil 
      (id_progreso, perfil, fecha_entrega, estado_perfil, comentario_perfil, descripcion) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_progreso, perfil, fecha_entrega, estado_perfil, comentario_perfil, descripcion]
    );
  },

  // Calificaciones
  async createCalificacion(calificacionData) {
    const { id_progreso, calificación } = calificacionData;
    await pool.query(
      'INSERT INTO calificaciones (id_progreso, calificación) VALUES ($1, $2)',
      [id_progreso, calificación]
    );
  },

  // Marco Teórico
  async createMarcoTeorico(marcoData) {
    const { id_progreso, marco, fecha_marco, estado_marco, comentario_marco, descripcion } = marcoData;
    await pool.query(
      `INSERT INTO marco_teorico 
      (id_progreso, marco, fecha_marco, estado_marco, comentario_marco, descripcion) 
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_progreso, marco, fecha_marco, estado_marco, comentario_marco, descripcion]
    );
  },

  // Análisis Preliminar
  async createAnalisisPreliminar(analisisData) {
    const { id_progreso, requerimientos, wireframes, estado_analisis, comentario_analisis, fecha, descripcion } = analisisData;
    await pool.query(
      `INSERT INTO analisis_preliminar 
      (id_progreso, requerimientos, wireframes, estado_analisis, comentario_analisis, fecha, descripcion) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_progreso, requerimientos, wireframes, estado_analisis, comentario_analisis, fecha, descripcion]
    );
  },

  // Modelo BD y C4
  async createBDModeloC4(bdData) {
    const { id_progreso, estado_presentacion, comentario_presentacion, fecha, bd, c4, descripcion } = bdData;
    await pool.query(
      `INSERT INTO bd_modelo_c4 
      (id_progreso, estado_presentacion, comentario_presentacion, fecha, bd, c4, descripcion) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_progreso, estado_presentacion, comentario_presentacion, fecha, bd, c4, descripcion]
    );
  },

  // Modelado UML
  async createModeladoUML(umlData) {
    const { id_progreso, estado_modelado, comentario_modelado, fecha, descripcion } = umlData;
    await pool.query(
      `INSERT INTO modelado_uml 
      (id_progreso, estado_modelado, comentario_modelado, fecha, descripcion) 
      VALUES ($1, $2, $3, $4, $5)`,
      [id_progreso, estado_modelado, comentario_modelado, fecha, descripcion]
    );
  },

  // Metodología y Vida Útil
  async createMetodologiaVidaUtil(metodologiaData) {
    const { id_progreso, id_panelista, metodologia, estado_presentacion, comentario_presentacion, fecha, descripcion } = metodologiaData;
    await pool.query(
      `INSERT INTO metodologia_vida_util 
      (id_progreso, id_panelista, metodologia, estado_presentacion, comentario_presentacion, fecha, descripcion) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_progreso, id_panelista, metodologia, estado_presentacion, comentario_presentacion, fecha, descripcion]
    );
  },

  // Diagramas
  async createDiagrama(diagramaData) {
    const { id_diagrama, doc_diagrama, id_tipo, id_progreso } = diagramaData;
    await pool.query(
      `INSERT INTO diagramas 
      (id_diagrama, doc_diagrama, id_tipo, id_progreso) 
      VALUES ($1, $2, $3, $4)`,
      [id_diagrama, doc_diagrama, id_tipo, id_progreso]
    );
  }
};