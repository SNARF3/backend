import { calendarioController } from "../controllers/calendario.controllers.js";
import { Router } from 'express';


const router = Router();


router.post('/RegistrarFecha', calendarioController.InsertarActividad);
router.get('/VerDatosFecha/:fecha', calendarioController.VerActividad);
router.delete('/EliminarFecha/:fecha', calendarioController.EliminarActividad);

export default router;