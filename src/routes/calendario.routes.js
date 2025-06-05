import { calendarioController } from "../controllers/calendario.controllers.js";
import { Router } from 'express';
import { TokenVerify } from "../middlewares/verifyToken.js";

const router = Router();

/**
 * @swagger
 * /RegistrarFecha:
 *   post:
 *     summary: Registra una nueva fecha en el calendario.
 *     tags:
 *       - Calendario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rubro:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fecha registrada exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/RegistrarFecha', calendarioController.InsertarActividad);

/**
 * @swagger
 * /VerDatosFecha/{nombre_rubro}:
 *   get:
 *     summary: Obtiene las actividades relacionadas con un rubro específico.
 *     tags:
 *       - Calendario
 *     parameters:
 *       - name: nombre_rubro
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Actividades obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre_rubro:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   descripcion:
 *                     type: string
 *       404:
 *         description: No se encontraron actividades para el rubro especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/VerDatosFecha/:nombre_rubro', calendarioController.VerActividad);

/**
 * @swagger
 * /EliminarFecha/{fecha}:
 *   delete:
 *     summary: Elimina una actividad del calendario según la fecha proporcionada.
 *     tags:
 *       - Calendario
 *     parameters:
 *       - name: fecha
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Actividad eliminada exitosamente.
 *       404:
 *         description: No se encontró ninguna actividad con la fecha especificada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/EliminarFecha/:fecha', calendarioController.EliminarActividad);

export default router;