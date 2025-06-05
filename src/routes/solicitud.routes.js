import { Router } from "express";
import { solicitudController } from "../controllers/solicitud.controllers.js";

const router = Router();

/**
 * @swagger
 * /solicitudesPendientes/{estado}:
 *   get:
 *     summary: Obtiene las solicitudes pendientes según su estado.
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: estado
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: >
 *           Estado de las solicitudes (ejemplo: pendiente, aprobado).
 *     responses:
 *       200:
 *         description: Solicitudes obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_solicitud:
 *                     type: integer
 *                   estado:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *       404:
 *         description: No se encontraron solicitudes con el estado especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/solicitudesPendientes/:estado", solicitudController.solicitudesPendientes);

/**
 * @swagger
 * /formId/{id_formulario}:
 *   get:
 *     summary: Obtiene los datos de un formulario específico por su ID.
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: id_formulario
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del formulario obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_formulario:
 *                   type: integer
 *                 descripcion:
 *                   type: string
 *                 estado:
 *                   type: string
 *       404:
 *         description: Formulario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/formId/:id_formulario", solicitudController.solicitudesPendId);

/**
 * @swagger
 * /formRevisados:
 *   get:
 *     summary: Obtiene los formularios revisados.
 *     tags:
 *       - Solicitudes
 *     responses:
 *       200:
 *         description: Formularios revisados obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_formulario:
 *                     type: integer
 *                   descripcion:
 *                     type: string
 *                   estado:
 *                     type: string
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/formRevisados", solicitudController.solicitudesPorEstado);

/**
 * @swagger
 * /revisionId/{id_cuenta}:
 *   get:
 *     summary: Obtiene las revisiones asociadas a una cuenta específica.
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: id_cuenta
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Revisiones obtenidas exitosamente.
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
 *       404:
 *         description: No se encontraron revisiones para la cuenta especificada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/revisionId/:id_cuenta", solicitudController.revisionesId);

/**
 * @swagger
 * /comentsId/{id_formulario}:
 *   get:
 *     summary: Obtiene los comentarios asociados a un formulario específico.
 *     tags:
 *       - Solicitudes
 *     parameters:
 *       - name: id_formulario
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentarios obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_comentario:
 *                     type: integer
 *                   contenido:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 *       404:
 *         description: No se encontraron comentarios para el formulario especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/comentsId/:id_formulario", solicitudController.comentsForms);

export default router;
