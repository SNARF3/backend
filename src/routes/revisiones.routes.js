import {Router} from 'express';
import {revisionesController} from '../controllers/revisiones.controllers.js';

const router = Router();
// Obtener todas las revisiones
router.post('/revisiones', revisionesController.obtenerTodasRevisiones);

export default router;