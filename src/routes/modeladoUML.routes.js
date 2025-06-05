import { Router } from "express";
import { modeladoUMLController } from "../controllers/modeladoUML.controllers.js";

const router = Router();

/**
 * @swagger
 * /modeladoUML/{id_progreso}:
 *   get:
 *     summary: Obtiene el modelado UML asociado a un progreso específico.
 *     tags:
 *       - Modelado UML
 *     parameters:
 *       - name: id_progreso
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modelado UML obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_modelado:
 *                   type: integer
 *                 id_progreso:
 *                   type: integer
 *                 diagramas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tipo:
 *                         type: string
 *                       contenido:
 *                         type: string
 *       404:
 *         description: No se encontró el modelado UML para el progreso especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/modeladoUML/:id_progreso', modeladoUMLController.obtenerModeladoUML);

router.post('/modeladoUML/insertarOActualizar', modeladoUMLController.insertarOActualizarModeladoUML);

export default router;