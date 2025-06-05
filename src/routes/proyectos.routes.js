import express from 'express';
import { ProyectoController } from '../controllers/proyectos.controllers.js';

const router = express.Router();

/**
 * @swagger
 * /proyectos/buscar:
 *   get:
 *     summary: Busca proyectos según criterios específicos.
 *     tags:
 *       - Proyectos
 *     parameters:
 *       - name: nombre
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: >
 *           Nombre del proyecto a buscar.
 *       - name: estado
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: >
 *           Estado del proyecto (ejemplo: activo, finalizado).
 *     responses:
 *       200:
 *         description: Proyectos encontrados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_proyecto:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *       404:
 *         description: No se encontraron proyectos con los criterios especificados.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/buscar', ProyectoController.buscar);

export default router;