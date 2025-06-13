import { Router } from "express";
import { actividadesController } from "../controllers/actividades.controllers.js";

const router = Router();


/**
 * @swagger
 * /insertarCurso:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_docente:
 *                 type: integer
 *                 example: 5
 *               gestion:
 *                 type: string
 *                 example: "2024-2025"
 *               paralelo:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               curso:
 *                 id_curso: 15
 *                 id_docente: 5
 *                 gestion: "2024-2025"
 *                 paralelo: "A"
 *       400:
 *         description: Parámetros faltantes
 *       500:
 *         description: Error del servidor
 */
router.post("/insertarCurso", actividadesController.insertarCurso);

/**
 * @swagger
 * /obtenerCursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               cursos:
 *                 - id_curso: 1
 *                   id_docente: 3
 *                   gestion: "2023-2024"
 *                   paralelo: "B"
 *                 - id_curso: 2
 *                   id_docente: 5
 *                   gestion: "2024-2025"
 *                   paralelo: "A"
 *       500:
 *         description: Error del servidor
 */
router.get("/obtenerCursos", actividadesController.obtenerCursos);

/**
 * @swagger
 * /obtenerUsuariosPorRol/{rol}:
 *   get:
 *     summary: Obtiene usuarios por rol
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol (1=Admin, 2=Docente, 3=Estudiante)
 *         example: 2
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               usuarios:
 *                 - id_cuenta: 10
 *                   nombres: "María"
 *                   apellido_paterno: "López"
 *                   apellido_materno: "García"
 *                 - id_cuenta: 12
 *                   nombres: "Carlos"
 *                   apellido_paterno: "Martínez"
 *                   apellido_materno: ""
 *       400:
 *         description: Parámetro rol faltante
 *       500:
 *         description: Error del servidor
 */
router.get("/obtenerUsuariosPorRol/:rol", actividadesController.obtenerUsuariosPorRol);

/**
 * @swagger
 * /obtenerProgresos:
 *   get:
 *     summary: Obtiene todos los registros de progreso
 *     tags: [Progresos]
 *     responses:
 *       200:
 *         description: Lista de progresos académicos
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               progresos:
 *                 - id_progreso: 1
 *                   id_estudiante: 100
 *                   id_curso: 5
 *                   estado: "En progreso"
 *                 - id_progreso: 2
 *                   id_estudiante: 101
 *                   id_curso: 5
 *                   estado: "Completado"
 *       500:
 *         description: Error del servidor
 */
router.get("/obtenerProgresos", actividadesController.obtenerProgresos);

/**
 * @swagger
 * /actualizarRegistro:
 *   patch:
 *     summary: Actualiza cualquier registro en la base de datos
 *     tags: [Progresos, Cursos, Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tabla:
 *                 type: string
 *                 example: "curso"
 *               id:
 *                 type: integer
 *                 example: 15
 *               campos:
 *                 type: object
 *                 example: { paralelo: "B", gestion: "2025-2026" }
 *     responses:
 *       200:
 *         description: Registro actualizado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               resultado:
 *                 id_curso: 15
 *                 paralelo: "B"
 *                 gestion: "2025-2026"
 *       400:
 *         description: Parámetros faltantes
 *       500:
 *         description: Error del servidor
 */
router.patch("/actualizarRegistro", actividadesController.actualizarRegistro);

/**
 * @swagger
 * /obtenerUsuarioPorId/{id_cuenta}:
 *   get:
 *     summary: Obtiene usuario por ID de cuenta
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_cuenta
 *         required: true
 *         schema:
 *           type: integer
 *         example: 25
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               usuario:
 *                 nombres: "Ana"
 *                 apellido_paterno: "Gómez"
 *                 apellido_materno: "Pérez"
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/obtenerUsuarioPorId/:id_cuenta", actividadesController.obtenerUsuarioPorId);

/**
 * @swagger
 * /eliminarCurso/{id_curso}:
 *   delete:
 *     summary: Elimina un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id_curso
 *         required: true
 *         schema:
 *           type: integer
 *         example: 15
 *     responses:
 *       200:
 *         description: Curso eliminado
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               msg: "Curso eliminado exitosamente"
 *               curso:
 *                 id_curso: 15
 *                 gestion: "2024-2025"
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/eliminarCurso/:id_curso", actividadesController.eliminarCurso);

/**
 * @swagger
 * /obtenerEstudiantesConDetalles:
 *   get:
 *     summary: Obtiene estudiantes con detalles académicos
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes con estructura para tablas
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               headersEstudiantes:
 *                 - { text: 'Nombre', value: 'nombre' }
 *                 - { text: 'Apellido Paterno', value: 'apellido_paterno' }
 *                 - { text: 'ID Progreso', value: 'id_progreso' }
 *                 - { text: 'Curso', value: 'curso' }
 *               estudiantes:
 *                 - nombre: "Juan"
 *                   apellido_paterno: "Pérez"
 *                   id_progreso: 101
 *                   curso: "Matemáticas"
 *                   tutor: "Dr. García"
 *                 - nombre: "Laura"
 *                   apellido_paterno: "Fernández"
 *                   id_progreso: 102
 *                   curso: "Física"
 *                   tutor: "Dra. Martínez"
 *       500:
 *         description: Error del servidor
 */
router.get("/obtenerEstudiantesConDetalles", actividadesController.obtenerEstudiantesConDetalles);

export default router;