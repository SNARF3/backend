import {Router} from 'express';
import {marcoTeoricoController} from '../controllers/marcoTeorico.controllers.js';

const router = Router();

router.get('/marcoTeorico/:id_progreso', marcoTeoricoController.obtenerMarcoTeorico);

export default router;