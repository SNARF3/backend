import { Router } from 'express';
import { cuentasModel} from '../models/cuentas.model.js';
import { cuentasController } from '../controllers/cuentas.controllers.js';

const router = Router();


router.post('/login', cuentasController.login);

router.post('/Registrar-Usuario', cuentasController.Registrar);

export default router;
