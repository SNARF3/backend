import express from "express";
import { Router } from 'express';
import { cursoController } from "../controllers/curso.controllers.js";

const router = Router();

// Rutas CRUD
router.get("/obtener-todos", cursoController.listar);
router.get("/obtener/:id", cursoController.obtener);
router.post("/crear", cursoController.crear);
router.put("/actualizar/:id", cursoController.actualizar);
router.delete("/eliminar/:id", cursoController.eliminar);

export default router;
