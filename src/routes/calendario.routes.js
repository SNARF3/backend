import { calendarioController } from "../controllers/calendario.controllers.js";
import { Router } from 'express';
import { TokenVerify } from "../middlewares/verifyToken.js";


const router = Router();


router.post('/RegistrarFecha', TokenVerify.TokenMiddlewareAdmin, calendarioController.InsertarActividad);
router.get('/VerDatosFecha/:fecha', calendarioController.VerActividad);
router.delete('/EliminarFecha/:fecha', calendarioController.EliminarActividad);

export default router;