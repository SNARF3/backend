import { Router } from 'express';
import { cuentasController } from '../controllers/cuentas.controllers.js';
import { TokenVerify } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/login', cuentasController.login);

router.post('/Registrar-Usuario', cuentasController.Registrar);

router.get("/obtUsuarios", cuentasController.obtenerDocentesYEstudiantes);

router.patch('/cambiarContrasenia', cuentasController.cambiarContrasenia);

router.post('/verificarContrasenia', cuentasController.verificarIdYContrasenia);

router.get('/obtenerRoles', cuentasController.obtenerRoles);

export default router;