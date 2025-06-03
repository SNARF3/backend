import express from 'express';
import { ProyectoController } from '../controllers/proyectos.controllers.js';

const router = express.Router();


router.get('/buscar', ProyectoController.buscar);

export default router;