import { ProyectosModel } from '../models/proyectos.model.js';


const buscar = async (req, res) => {
    try {
        const { anio, modalidad, titulo, tutor, estudiante, page = 1, limit = 10 } = req.query; // Incluye estudiante

        // Validaciones
        if (isNaN(page) || isNaN(limit)) {
            return res.status(400).json({ error: "Parámetros de paginación inválidos" });
        }

        const offset = (page - 1) * limit;
        const filters = { anio, modalidad, titulo, tutor, estudiante, limit, offset }; // Pasa estudiante

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

const obtenerTodosProyectos = async (req, res) => {
    try {
        const proyectos = await ProyectosModel.obtenerTodos();
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener todos los proyectos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const ProyectoController = {
    buscar,
    obtenerTodosProyectos
};
