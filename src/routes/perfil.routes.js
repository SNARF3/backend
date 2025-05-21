import {Router} from 'express';
import {perfilController} from '../controllers/perfil.controllers.js';

const router = Router();

router.get('/perfil/:id_progreso', perfilController.obtenerPerfil);

export default router;