import { Router } from "express";
import { progresoController } from "../controllers/progreso.controller.js";

const router = Router();

// Obtener todos los progresos
router.get("/obtener-todos", progresoController.listarProgresos);

// Obtener un progreso específico
router.get("/obtener/:id", progresoController.obtenerProgreso);

// Crear un nuevo progreso
router.post("/registrar", progresoController.crearProgreso);

// Actualizar un progreso existente
router.put("/actualizar/:id", progresoController.actualizarProgreso);

// Eliminar un progreso
router.delete("/eliminar/:id", progresoController.eliminarProgreso);

export default router;