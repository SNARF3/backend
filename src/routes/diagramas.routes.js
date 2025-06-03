import { diagramasController } from "../controllers/diagramas.controllers.js";

import { Router } from "express";
const router = Router();

// Rutas para los diagramas
router.get("/diagramas", diagramasController.obtenerDiagramas);

export default router;