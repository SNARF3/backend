import { ProgresoModel } from '../models/progreso.model.js';
import { handleError } from '../middlewares/errorHandler.js';

export const ProgresoController = {
  // Crear progreso principal
  async createProgreso(req, res) {
    try {
      const { id_estudiante, id_curso, id_tutor } = req.body;
      if (!id_estudiante || !id_curso || !id_tutor) {
        return res.status(400).json({ error: 'Datos incompletos para crear progreso' });
      }
      
      const id_progreso = await ProgresoModel.createProgreso(id_estudiante, id_curso, id_tutor);
      res.status(201).json({ id_progreso });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Perfil
  async createPerfil(req, res) {
    try {
      const requiredFields = ['id_progreso', 'perfil', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const perfilData = {
        id_progreso: req.body.id_progreso,
        perfil: req.body.perfil,
        fecha_entrega: new Date(),
        estado_perfil: 1, // 1 = Pendiente
        comentario_perfil: '',
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createPerfil(perfilData);
      res.status(201).json({ message: 'Perfil creado exitosamente' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Calificaciones
  async createCalificacion(req, res) {
    try {
      if (!req.body.id_progreso || !req.body.calificación) {
        return res.status(400).json({ error: 'Datos incompletos' });
      }

      const calificacionData = {
        id_progreso: req.body.id_progreso,
        calificación: parseFloat(req.body.calificación)
      };
      
      await ProgresoModel.createCalificacion(calificacionData);
      res.status(201).json({ message: 'Calificación registrada' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Marco Teórico
  async createMarcoTeorico(req, res) {
    try {
      const requiredFields = ['id_progreso', 'marco', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const marcoData = {
        id_progreso: req.body.id_progreso,
        marco: req.body.marco,
        fecha_marco: new Date(),
        estado_marco: 1, // 1 = En revisión
        comentario_marco: '',
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createMarcoTeorico(marcoData);
      res.status(201).json({ message: 'Marco teórico registrado' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Análisis Preliminar
  async createAnalisisPreliminar(req, res) {
    try {
      const requiredFields = ['id_progreso', 'requerimientos', 'wireframes', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const analisisData = {
        id_progreso: req.body.id_progreso,
        requerimientos: req.body.requerimientos,
        wireframes: req.body.wireframes,
        estado_analisis: 1, // 1 = En progreso
        comentario_analisis: '',
        fecha: new Date(),
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createAnalisisPreliminar(analisisData);
      res.status(201).json({ message: 'Análisis preliminar registrado' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Modelo BD y C4
  async createBDModeloC4(req, res) {
    try {
      const requiredFields = ['id_progreso', 'bd', 'c4', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const bdData = {
        id_progreso: req.body.id_progreso,
        estado_presentacion: 1, // 1 = Pendiente
        comentario_presentacion: '',
        fecha: new Date(),
        bd: req.body.bd,
        c4: req.body.c4,
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createBDModeloC4(bdData);
      res.status(201).json({ message: 'Modelo BD y C4 registrado' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Modelado UML
  async createModeladoUML(req, res) {
    try {
      const requiredFields = ['id_progreso', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const umlData = {
        id_progreso: req.body.id_progreso,
        estado_modelado: 1, // 1 = Borrador
        comentario_modelado: '',
        fecha: new Date(),
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createModeladoUML(umlData);
      res.status(201).json({ message: 'Modelado UML registrado' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Metodología y Vida Útil
  async createMetodologiaVidaUtil(req, res) {
    try {
      const requiredFields = ['id_progreso', 'id_panelista', 'metodologia', 'descripcion'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const metodologiaData = {
        id_progreso: req.body.id_progreso,
        id_panelista: req.body.id_panelista,
        metodologia: req.body.metodologia,
        estado_presentacion: 1, // 1 = Pendiente
        comentario_presentacion: '',
        fecha: new Date(),
        descripcion: req.body.descripcion
      };
      
      await ProgresoModel.createMetodologiaVidaUtil(metodologiaData);
      res.status(201).json({ message: 'Metodología registrada' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Diagramas
  async createDiagrama(req, res) {
    try {
      const requiredFields = ['id_progreso', 'doc_diagrama', 'id_tipo'];
      if (!requiredFields.every(field => req.body[field])) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
      }

      const diagramaData = {
        id_diagrama: req.body.id_diagrama, // Debe ser generado o autosecuencial
        doc_diagrama: req.body.doc_diagrama,
        id_tipo: req.body.id_tipo,
        id_progreso: req.body.id_progreso
      };
      
      await ProgresoModel.createDiagrama(diagramaData);
      res.status(201).json({ message: 'Diagrama registrado' });
    } catch (error) {
      handleError(res, error);
    }
  },

  // Método adicional para manejo de actualizaciones
  async updateEstadoProgreso(req, res) {
    try {
      const { id_progreso, nuevo_estado } = req.body;
      if (!id_progreso || !nuevo_estado) {
        return res.status(400).json({ error: 'Datos incompletos' });
      }

      await pool.query(
        'UPDATE progreso SET estado_progreso = ? WHERE id_progreso = ?',
        [nuevo_estado, id_progreso]
      );
      
      res.status(200).json({ message: 'Estado actualizado' });
    } catch (error) {
      handleError(res, error);
    }
  }
};
