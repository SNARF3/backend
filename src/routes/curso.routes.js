import express from "express";
import { Router } from 'express';
import { cursoController } from "../controllers/curso.controllers.js";

const router = Router();

/**
 * @swagger
 * /curso/obtener-todos:
 *   get:
 *     summary: Obtiene todos los cursos.
 *     tags:
 *       - Curso
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_curso:
 *                     type: integer
 *                   id_docente:
 *                     type: integer
 *                   gestion:
 *                     type: string
 *                   paralelo:
 *                     type: integer
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtener-todos", cursoController.listar);

/**
 * @swagger
 * /curso/obtener/{id}:
 *   get:
 *     summary: Obtiene un curso por su ID.
 *     tags:
 *       - Curso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_curso:
 *                   type: integer
 *                 id_docente:
 *                   type: integer
 *                 gestion:
 *                   type: string
 *                 paralelo:
 *                   type: integer
 *       404:
 *         description: Curso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtener/:id", cursoController.obtener);

/**
 * @swagger
 * /curso/crear:
 *   post:
 *     summary: Crea un nuevo curso.
 *     tags:
 *       - Curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_docente:
 *                 type: integer
 *               gestion:
 *                 type: string
 *               paralelo:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Curso creado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/crear", cursoController.crear);

/**
 * @swagger
 * /curso/actualizar/{id}:
 *   put:
 *     summary: Actualiza un curso existente.
 *     tags:
 *       - Curso
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
 *               id_docente:
 *                 type: integer
 *               gestion:
 *                 type: string
 *               paralelo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente.
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Curso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/actualizar/:id", cursoController.actualizar);

/**
 * @swagger
 * /curso/eliminar/{id}:
 *   delete:
 *     summary: Elimina un curso por su ID.
 *     tags:
 *       - Curso
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente.
 *       404:
 *         description: Curso no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/eliminar/:id", cursoController.eliminar);

export default router;
