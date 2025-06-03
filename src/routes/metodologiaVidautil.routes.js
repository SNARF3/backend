import {Router} from 'express';
import {metodologiaVidaUtilController} from '../controllers/metodologiaVidaUtil.controllers.js';
import { fileUpload } from '../middlewares/upload.js';

const router = Router();

router.get('/metodologiaVidaUtil/:id_progreso', metodologiaVidaUtilController.obtenerMetodologiaVidaUtil);

router.post('/metodologiaVidaUtil/insertarOActualizar', fileUpload, metodologiaVidaUtilController.insertarOActualizarMetodologiaVidaUtil);

export default router;