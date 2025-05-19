// routes/progreso.routes.js
import express from 'express';
import { ProgresoController } from '../controllers/progreso.controllers.js';

const router = express.Router();

// Ruta para crear progreso principal
router.post('/progreso', ProgresoController.createProgreso);

// Rutas para los componentes del progreso
router.post('/progreso/perfil', ProgresoController.createPerfil);
router.post('/progreso/calificacion', ProgresoController.createCalificacion);
router.post('/progreso/marco-teorico', ProgresoController.createMarcoTeorico);
router.post('/progreso/analisis-preliminar', ProgresoController.createAnalisisPreliminar);
router.post('/progreso/modelo-bd-c4', ProgresoController.createBDModeloC4);
router.post('/progreso/modelado-uml', ProgresoController.createModeladoUML);
router.post('/progreso/metodologia-vida-util', ProgresoController.createMetodologiaVidaUtil);
router.post('/progreso/diagramas', ProgresoController.createDiagrama);

// Ruta para actualizar estado
router.put('/progreso/estado', ProgresoController.updateEstadoProgreso);

export default router;