import { Router } from "express";
import {pool} from "../db.js"
import { solicitudController } from "../controllers/solicitud.controllers.js";

const router = Router();

//Tabla de solicitudes Pendientes:
router.get("/solicitudesPendientes/:estado", solicitudController.solicitudesPendientes)

//Datos de un formulario Especifico por su id:
router.get("/formId/:id_formulario", solicitudController.solicitudesPendId)

export default router;
