import { Router } from "express";
import { modeladoUMLController } from "../controllers/modeladoUML.controllers.js";

const router = Router();

router.get('/modeladoUML/:id_progreso', modeladoUMLController.obtenerModeladoUML);

export default router;