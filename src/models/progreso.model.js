import { pool } from "../db.js";

// Listar todos los progresos con datos de estudiantes, tutores y cursos
const getAllProgress = async () => {
    const query = `
        SELECT 
            pr.id_progreso,
            pr.estado_progreso,
            -- Datos del estudiante
            pe.nombres AS estudiante_nombres,
            pe.apellido_paterno AS estudiante_apellido_paterno,
            pe.apellido_materno AS estudiante_apellido_materno,
            ce.id_cuenta AS estudiante_id_cuenta,
            -- Datos del tutor
            pt.nombres AS tutor_nombres,
            pt.apellido_paterno AS tutor_apellido_paterno,
            ct.id_cuenta AS tutor_id_cuenta,
            -- Datos del curso
            cu.id_curso,
            cu.gestion
        FROM 
            progreso pr
        JOIN 
            cuentas ce ON pr.id_estudiante = ce.id_cuenta
        JOIN 
            persona pe ON ce.id_persona = pe.id_persona
        JOIN 
            cuentas ct ON pr.id_tutor = ct.id_cuenta
        JOIN 
            persona pt ON ct.id_persona = pt.id_persona
        JOIN 
            curso cu ON pr.id_curso = cu.id_curso`;
    
    const { rows } = await pool.query(query);
    return rows;
};

// Obtener un progreso por ID con relaciones
const getProgressById = async (id) => {
    const query = `
        SELECT 
            pr.id_progreso,
            pr.estado_progreso,
            -- Datos del estudiante
            pe.nombres AS estudiante_nombres,
            pe.apellido_paterno AS estudiante_apellido_paterno,
            pe.apellido_materno AS estudiante_apellido_materno,
            ce.id_cuenta AS estudiante_id_cuenta,
            -- Datos del tutor
            pt.nombres AS tutor_nombres,
            pt.apellido_paterno AS tutor_apellido_paterno,
            ct.id_cuenta AS tutor_id_cuenta,
            -- Datos del curso
            cu.id_curso,
            cu.gestion
        FROM 
            progreso pr
        JOIN 
            cuentas ce ON pr.id_estudiante = ce.id_cuenta
        JOIN 
            persona pe ON ce.id_persona = pe.id_persona
        JOIN 
            cuentas ct ON pr.id_tutor = ct.id_cuenta
        JOIN 
            persona pt ON ct.id_persona = pt.id_persona
        JOIN 
            curso cu ON pr.id_curso = cu.id_curso
        WHERE 
            pr.id_progreso = $1`;
    
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Crear un nuevo registro de progreso
const createProgress = async ({ id_estudiante, id_curso, id_tutor }) => {
    const query = `
        INSERT INTO progreso (id_estudiante, id_curso, id_tutor, estado_progreso)
        VALUES ($1, $2, $3, 1)
        RETURNING *`;
    
    const values = [id_estudiante, id_curso, id_tutor];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Actualizar un progreso existente
const updateProgress = async (id, { id_estudiante, id_curso, id_tutor, estado_progreso }) => {
    const query = `
        UPDATE progreso
        SET 
            id_estudiante = $1,
            id_curso = $2,
            id_tutor = $3,
            estado_progreso = $4
        WHERE 
            id_progreso = $5
        RETURNING *`;
    
    const values = [id_estudiante, id_curso, id_tutor, estado_progreso, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

// Eliminar un progreso
const deleteProgress = async (id) => {
    const query = `
        DELETE FROM progreso
        WHERE id_progreso = $1
        RETURNING *`;
    
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};
// Función para verificar si ya existe un progreso para el estudiante en el curso
const checkExistingProgress = async (id_estudiante, id_curso) => {
    const query = `
        SELECT 1 FROM progreso 
        WHERE id_estudiante = $1 AND id_curso = $2`;
    
    const { rowCount } = await pool.query(query, [id_estudiante, id_curso]);
    return rowCount > 0;
};

export const progresoModel = {
    getAllProgress,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress,
    checkExistingProgress
};