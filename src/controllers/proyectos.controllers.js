import { ProyectosModel } from '../models/proyectos.model.js';


const buscar = async (req, res) => {
    try {
        const { anio, modalidad, titulo, tutor, page = 1, limit = 10 } = req.query; // Usando query params

        // Validaciones
        if (isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ error: "Parámetros de paginación inválidos" });
        }

        const offset = (page - 1) * limit;
        const filters = { anio, modalidad, titulo, tutor, limit, offset };

        const proyectos = await ProyectosModel.buscar(filters);

        res.json({
            success: true,
            data: proyectos,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total: proyectos.length
            }
        });

    } catch (error) {
        console.error("Error en ProyectoController.buscar:", error);
        res.status(500).json({
            success: false,
            error: "Error interno al buscar proyectos"
        });
    }
}


export const ProyectoController = {
    buscar
};
