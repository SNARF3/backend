import multer from "multer";
import { formularioController } from "../controllers/formulario.controllers.js";
import { Router } from "express";

// Importa el middleware de Multer
import { upload } from "../middlewares/upload.js";  // Si tu archivo de configuración se encuentra en 'middlewares/upload.js'

// Crea el router
const router = Router();

// Ruta para manejar el envío de formulario con archivos
router.post(
    "/RegistrarFormulario", 
    upload.fields([
        { name: 'proyectoTrabajo', maxCount: 1 },  // Campo para 'proyectoTrabajo'
        { name: 'detallePropuesta', maxCount: 1 }  // Campo para 'detallePropuesta'
    ]), 
    formularioController.enviarFormulario // El controlador que maneja el formulario
);

//Tabla de solicitudes Pendientes:
router.patch("/cambiarEstado/:id_formulario/:nuevo_estado", formularioController.cambiarEstadoFormulario);

router.post('/registrarRevision', formularioController.insertarFormularioEstado)

export default router;
