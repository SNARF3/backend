import { Router } from 'express';
import { revisionesController } from '../controllers/revisiones.controllers.js';

const router = Router();

/**
 * @swagger
 * /revisiones:
 *   post:
 *     summary: Obtiene todas las revisiones.
 *     tags:
 *       - Revisiones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filtro:
 *                 type: string
 *                 description: Filtro opcional para buscar revisiones.
 *     responses:
 *       200:
 *         description: Lista de revisiones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_revision:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   estado:
 *                     type: string
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/revisiones', revisionesController.obtenerTodasRevisiones);

export default router;