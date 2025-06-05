import {BDModeloC4Controller} from "../controllers/bdModeloC4.controllers.js";
import {Router} from 'express';
import { fileUpload } from '../middlewares/upload.js';

const router = Router();

/**
 * @swagger
 * /bdModeloC4/insertarOActualizar:
 *   post:
 *     summary: Inserta o actualiza la información de la base de datos y modelo C4, permitiendo subir archivos.
 *     tags:
 *       - BDModeloC4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT del usuario.
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la entrega.
 *               bdFile:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de la base de datos (opcional).
 *               c4File:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del modelo C4 (opcional).
 *     responses:
 *       200:
 *         description: Información insertada o actualizada exitosamente.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/bdModeloC4/insertarOActualizar', fileUpload, BDModeloC4Controller.insertarOActualizarBDyModeloC4);

export default router;