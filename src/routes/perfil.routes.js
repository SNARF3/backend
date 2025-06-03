import {Router} from 'express';
import {perfilController} from '../controllers/perfil.controllers.js';
import { fileUpload } from "../middlewares/upload.js";

const router = Router();

router.get('/perfil/:id_progreso',perfilController.obtenerPerfil);

router.post('/perfil/insertarOActualizar',fileUpload, perfilController.insertarOActualizarPerfil);

export default router;