import { Router } from 'express';
import { perfilController } from '../controllers/perfil.controllers.js';
import { fileUpload } from "../middlewares/upload.js";

const router = Router();

/**
 * @swagger
 * /perfil/{id_progreso}:
 *   get:
 *     summary: Obtiene el perfil asociado a un progreso específico.
 *     tags:
 *       - Perfil
 *     parameters:
 *       - name: id_progreso
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_perfil:
 *                   type: integer
 *                 id_progreso:
 *                   type: integer
 *                 detalles:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     descripcion:
 *                       type: string
 *       404:
 *         description: No se encontró el perfil para el progreso especificado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/perfil/:id_progreso', perfilController.obtenerPerfil);

/**
 * @swagger
 * /perfil/insertarOActualizar:
 *   post:
 *     summary: Inserta o actualiza un perfil con posibilidad de subir archivos
 *     tags:
 *       - Perfil
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_progreso:
 *                 type: integer
 *               detalles:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Perfil insertado o actualizado exitosamente
 *       400:
 *         description: Datos inválidos proporcionados
 *       500:
 *         description: Error interno del servidor
 */
router.post('/perfil/insertarOActualizar', fileUpload, perfilController.insertarOActualizarPerfil);

export default router;