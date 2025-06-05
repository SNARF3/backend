import { Router } from "express";
import { progresoController } from "../controllers/progreso.controller.js";

const router = Router();

/**
 * @swagger
 * /progreso/obtener-todos:
 *   get:
 *     summary: Obtiene todos los progresos.
 *     tags:
 *       - Progreso
 *     responses:
 *       200:
 *         description: Lista de progresos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_progreso:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtener-todos", progresoController.listarProgresos);

/**
 * @swagger
 * /progreso/obtener/{id}:
 *   get:
 *     summary: Obtiene un progreso específico por su ID.
 *     tags:
 *       - Progreso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Progreso obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_progreso:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       404:
 *         description: Progreso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtener/:id", progresoController.obtenerProgreso);

/**
 * @swagger
 * /progreso/registrar:
 *   post:
 *     summary: Crea un nuevo progreso.
 *     tags:
 *       - Progreso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Progreso creado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/registrar", progresoController.crearProgreso);

/**
 * @swagger
 * /progreso/actualizar/{id}:
 *   put:
 *     summary: Actualiza un progreso existente.
 *     tags:
 *       - Progreso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Progreso actualizado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Progreso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/actualizar/:id", progresoController.actualizarProgreso);

/**
 * @swagger
 * /progreso/eliminar/{id}:
 *   delete:
 *     summary: Elimina un progreso por su ID.
 *     tags:
 *       - Progreso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Progreso eliminado exitosamente.
 *       404:
 *         description: Progreso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/eliminar/:id", progresoController.eliminarProgreso);

export default router;