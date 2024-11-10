import { Router } from "express";
import {pool} from "../db.js"
import { solicitudController } from "../controllers/solicitud.controllers.js";

const router = Router();

router.get("/solicitudesPendientes", solicitudController.solicitudesPendientes)

export default router;
