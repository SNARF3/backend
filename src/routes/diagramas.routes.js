import { diagramasController } from "../controllers/diagramas.controllers.js";
import { fileUpload } from "../middlewares/upload.js";

import { Router } from "express";
const router = Router();

// Rutas para los diagramas
router.get("/diagramas", diagramasController.obtenerDiagramas);

router.post("/diagramas/insertarOActualizar", fileUpload, diagramasController.insertarOActualizarDiagrama);

export default router;