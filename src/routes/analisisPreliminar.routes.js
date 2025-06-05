import {analisisPreliminarController} from '../controllers/analisisPreliminar.controllers.js';
import {Router} from 'express';
import { fileUpload } from '../middlewares/upload.js';
const router = Router();

router.post('/analisisPreliminar/insertarOActualizar', fileUpload, analisisPreliminarController.insertarOActualizarAnalisisPreliminar);

export default router;