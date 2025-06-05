import { Router } from 'express';
import { cuentasController } from '../controllers/cuentas.controllers.js';
import { TokenVerify } from '../middlewares/verifyToken.js';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión en el sistema.
 *     tags:
 *       - Cuentas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', cuentasController.login);

/**
 * @swagger
 * /Registrar-Usuario:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema.
 *     tags:
 *       - Cuentas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [docente, estudiante]
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/Registrar-Usuario', cuentasController.Registrar);

/**
 * @swagger
 * /obtUsuarios:
 *   get:
 *     summary: Obtiene una lista de docentes y estudiantes.
 *     tags:
 *       - Cuentas
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   rol:
 *                     type: string
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/obtUsuarios', cuentasController.obtenerDocentesYEstudiantes);

/**
 * @swagger
 * /cambiarContrasenia:
 *   patch:
 *     summary: Cambia la contraseña de un usuario.
 *     tags:
 *       - Cuentas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/cambiarContrasenia', cuentasController.cambiarContrasenia);

export default router;