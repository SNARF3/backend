import {Router} from 'express';
import {marcoTeoricoController} from '../controllers/marcoTeorico.controllers.js';
import { fileUpload } from '../middlewares/upload.js';

const router = Router();

router.get('/marcoTeorico/:id_progreso', marcoTeoricoController.obtenerMarcoTeorico);

router.post('/marcoTeorico/insertarOActualizar', fileUpload, marcoTeoricoController.insertarOActualizarMarcoTeorico);

export default router;