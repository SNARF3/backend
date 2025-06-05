import { fileUpload } from "../middlewares/upload.js"; // Middleware de Multer
import { formularioController } from "../controllers/formulario.controllers.js";
import { Router } from "express";
import { enviarFormulario } from "../controllers/formulario.controllers.js"; 

const router = Router();

/**
 * @swagger
 * /RegistrarFormulario:
 *   post:
 *     summary: Registra un formulario con archivos adjuntos.
 *     tags:
 *       - Formulario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archivo:
 *                 type: string
 *                 format: binary
 *               datosFormulario:
 *                 type: string
 *                 description: Datos del formulario en formato JSON.
 *     responses:
 *       201:
 *         description: Formulario registrado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/RegistrarFormulario", 
  fileUpload, // Middleware de Multer para manejar la carga de archivos
  enviarFormulario // El controlador que maneja el formulario
);

/**
 * @swagger
 * /cambiarEstado/{id_formulario}/{nuevo_estado}:
 *   patch:
 *     summary: Cambia el estado de un formulario.
 *     tags:
 *       - Formulario
 *     parameters:
 *       - name: id_formulario
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: nuevo_estado
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado del formulario cambiado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Formulario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/cambiarEstado/:id_formulario/:nuevo_estado", formularioController.cambiarEstadoFormulario);

/**
 * @swagger
 * /RegistrarObservacion:
 *   post:
 *     summary: Registra una observación en un formulario.
 *     tags:
 *       - Formulario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_formulario:
 *                 type: integer
 *               observacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Observación registrada exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/RegistrarObservacion', formularioController.DejarObservacion);

export default router;
