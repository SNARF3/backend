import { Router } from "express";
import { actividadesController } from "../controllers/actividades.controllers.js";

const router = Router();

router.post("/insertarCurso", actividadesController.insertarCurso);
router.get("/obtenerCursos", actividadesController.obtenerCursos); // Ruta para obtener cursos
router.get("/obtenerUsuariosPorRol/:rol", actividadesController.obtenerUsuariosPorRol); // Ruta para obtener usuarios por rol
router.get("/obtenerProgresos", actividadesController.obtenerProgresos);
router.patch("/actualizarRegistro", actividadesController.actualizarRegistro);
router.get("/obtenerUsuarioPorId/:id_cuenta", actividadesController.obtenerUsuarioPorId);
router.delete("/eliminarCurso/:id_curso", actividadesController.eliminarCurso);
router.get("/obtenerEstudiantesConDetalles", actividadesController.obtenerEstudiantesConDetalles);

export default router;