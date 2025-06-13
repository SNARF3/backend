import { pool } from "../db.js";

const insertarCurso = async ({ id_docente, gestion, paralelo }) => {
    const query = `
        INSERT INTO curso (id_docente, gestion, paralelo)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [id_docente, gestion, paralelo];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const obtenerCursos = async () => {
    const query = `
        SELECT * FROM curso;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

const obtenerUsuariosPorRol = async (rol) => {
    const query = `
        SELECT cuentas.id_cuenta, persona.nombres, persona.apellido_paterno, persona.apellido_materno
        FROM persona
        JOIN cuentas ON persona.id_persona = cuentas.id_persona
        WHERE cuentas.id_rol = $1;
    `;
    const values = [rol];
    const { rows } = await pool.query(query, values);
    return rows;
};

const obtenerProgresos = async () => {
    const query = `
        SELECT * FROM progreso;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

const actualizarRegistro = async (tabla, id, campos) => {
    const setClause = Object.keys(campos)
        .map((campo, index) => `${campo} = $${index + 2}`)
        .join(", ");
    const query = `
        UPDATE ${tabla}
        SET ${setClause}
        WHERE id_${tabla} = $1
        RETURNING *;
    `;
    const values = [id, ...Object.values(campos)];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const obtenerUsuarioPorId = async (id_cuenta) => {
    const query = `
        SELECT persona.nombres, persona.apellido_paterno, persona.apellido_materno
        FROM persona
        JOIN cuentas ON persona.id_persona = cuentas.id_persona
        WHERE cuentas.id_cuenta = $1;
    `;
    const values = [id_cuenta];
    try {
        const { rows } = await pool.query(query, values);
        return rows[0]; // Devuelve el primer resultado (usuario encontrado)
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    }
};

const eliminarCurso = async (id_curso) => {
    const query = `
        DELETE FROM curso
        WHERE id_curso = $1
        RETURNING *;
    `;
    const values = [id_curso];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0]; // Devuelve el curso eliminado
    } catch (error) {
        console.error("Error al eliminar curso:", error);
        throw error;
    }
};

const obtenerEstudiantesConDetalles = async () => {
    const query = `
        SELECT 
            persona.nombres AS nombre,
            persona.apellido_paterno AS apellido_paterno,
            persona.apellido_materno AS apellido_materno,
            progreso.id_progreso AS id_progreso,
            progreso.id_curso AS curso,
            progreso.id_tutor AS tutor,
            progreso.id_panelista AS panelista
        FROM cuentas
        JOIN persona ON cuentas.id_persona = persona.id_persona
        LEFT JOIN progreso ON cuentas.id_cuenta = progreso.id_estudiante
        LEFT JOIN metodologia_vida_util ON metodologia_vida_util.id_progreso = progreso.id_progreso
        WHERE cuentas.id_rol = 3;
    `;

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener estudiantes con detalles:", error);
        throw error;
    }
};

export const actividadesModel = {
    insertarCurso,
    obtenerCursos,
    obtenerUsuariosPorRol,
    obtenerProgresos,
    actualizarRegistro,
    obtenerUsuarioPorId, // Nueva función agregada
    eliminarCurso, // Agrega la nueva función
    obtenerEstudiantesConDetalles, // Agrega la nueva función
};