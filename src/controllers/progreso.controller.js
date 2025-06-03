import { progresoModel } from "../models/progreso.model.js";
import { pool } from "../db.js";

// Función auxiliar para verificar si un ID existe en una tabla
const checkIfExists = async (table, id) => {
    const query = `SELECT 1 FROM ${table} WHERE id_${table} = $1`;
    const { rowCount } = await pool.query(query, [id]);
    return rowCount > 0;
};

export const listarProgresos = async (req, res) => {
    try {
        const progresos = await progresoModel.getAllProgress();
        res.json({
            success: true,
            data: progresos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la lista de progresos',
            error: error.message
        });
    }
};

export const obtenerProgreso = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea numérico
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de progreso inválido'
            });
        }

        const progreso = await progresoModel.getProgressById(id);
        
        if (!progreso) {
            return res.status(404).json({
                success: false,
                message: 'Progreso no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: progreso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el progreso',
            error: error.message
        });
    }
};

export const crearProgreso = async (req, res) => {
    try {
        const { id_estudiante, id_curso, id_tutor } = req.body;
        
        // Validaciones básicas
        if (!id_estudiante || !id_curso || !id_tutor) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos: id_estudiante, id_curso, id_tutor'
            });
        }

        // Verificar que los IDs existan en sus respectivas tablas
        const estudianteExiste = await checkIfExists('cuentas', id_estudiante);
        const cursoExiste = await checkIfExists('curso', id_curso);
        const tutorExiste = await checkIfExists('cuentas', id_tutor);

        if (!estudianteExiste || !cursoExiste || !tutorExiste) {
            const errors = [];
            if (!estudianteExiste) errors.push('El estudiante no existe');
            if (!cursoExiste) errors.push('El curso no existe');
            if (!tutorExiste) errors.push('El tutor no existe');
            
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors
            });
        }

        // Verificar que el estudiante no tenga ya un progreso en el mismo curso
        const existeProgreso = await progresoModel.checkExistingProgress(id_estudiante, id_curso);
        if (existeProgreso) {
            return res.status(400).json({
                success: false,
                message: 'El estudiante ya tiene un progreso registrado para este curso'
            });
        }

        const nuevoProgreso = await progresoModel.createProgress({
            id_estudiante,
            id_curso,
            id_tutor
        });
        
        res.status(201).json({
            success: true,
            message: 'Progreso creado exitosamente',
            data: nuevoProgreso
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el progreso',
            error: error.message
        });
    }
};

export const actualizarProgreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_estudiante, id_curso, id_tutor, estado_progreso } = req.body;
        
        // Validar que el ID sea numérico
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de progreso inválido'
            });
        }

        // Validar que al menos un campo sea proporcionado para actualizar
        if (!id_estudiante && !id_curso && !id_tutor && !estado_progreso) {
            return res.status(400).json({
                success: false,
                message: 'Debe proporcionar al menos un campo para actualizar'
            });
        }

        // Verificar que los IDs existan si son proporcionados
        const errors = [];
        if (id_estudiante && !(await checkIfExists('cuentas', id_estudiante))) {
            errors.push('El estudiante no existe');
        }
        if (id_curso && !(await checkIfExists('curso', id_curso))) {
            errors.push('El curso no existe');
        }
        if (id_tutor && !(await checkIfExists('cuentas', id_tutor))) {
            errors.push('El tutor no existe');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors
            });
        }

        // Validar estado_progreso si es proporcionado
        if (estado_progreso && (estado_progreso < 1 || estado_progreso > 5)) {
            return res.status(400).json({
                success: false,
                message: 'El estado del progreso debe ser un valor entre 1 y 5'
            });
        }

        const datosActualizados = {
            id_estudiante,
            id_curso,
            id_tutor,
            estado_progreso
        };

        const progresoActualizado = await progresoModel.updateProgress(id, datosActualizados);
        
        if (!progresoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Progreso no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Progreso actualizado exitosamente',
            data: progresoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el progreso',
            error: error.message
        });
    }
};

export const eliminarProgreso = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea numérico
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'ID de progreso inválido'
            });
        }

        const progresoEliminado = await progresoModel.deleteProgress(id);
        
        if (!progresoEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Progreso no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Progreso eliminado exitosamente',
            data: progresoEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el progreso',
            error: error.message
        });
    }
};

export const progresoController = {
    listarProgresos,
    obtenerProgreso,
    crearProgreso,
    actualizarProgreso,
    eliminarProgreso
};