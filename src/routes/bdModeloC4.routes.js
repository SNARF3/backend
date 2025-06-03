import {BDModeloC4Controller} from "../controllers/bdModeloC4.controllers.js";
import {Router} from 'express';
import { fileUpload } from '../middlewares/upload.js';

const router = Router();

router.post('/bdModeloC4/insertarOActualizar', fileUpload, BDModeloC4Controller.insertarOActualizarBDyModeloC4);

export default router;