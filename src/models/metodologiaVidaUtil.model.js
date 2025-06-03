import {pool} from '../db.js';

const obtenerMetodologiaVidaUtil = async ({id_cuenta}) => {
    const query = {
        text: 
            `select p.tipo, CONCAT(per.nombres, ' ', per.apellido_paterno, ' ', per.apellido_materno) AS nombre_completo, p.fecha, p.id_progreso
            from metodologia_vida_util p, persona per, cuentas cu, progreso prog, curso cur
            where p.id_progreso = prog.id_progreso
            and prog.id_estudiante = cu.id_cuenta
            and cu.id_persona = per.id_persona
            and cur.id_curso = prog.id_curso
            and p.estado_presentacion = 1
            and cur.id_docente = $1;
        `,
        values: [id_cuenta]
    };
    const { rows } = await pool.query(query);
    return rows;
}

const obtenerTodoMetodologiaVidaUtil = async ({id_progreso}) => {
    const query = {
        text: 
            `select p.descripcion, p.tipo, p.metodologia as link
            from metodologia_vida_util p
            where id_progreso = $1
            and estado_presentacion != 3;
        `,
        values: [id_progreso]
    }
    const { rows } = await pool.query(query);
    return rows;
}

const insertarOActualizarMetodologiaVidaUtil = async ({ id_estudiante, descripcion, metodologia, fecha }) => {
    // Obtener el id_progreso del estudiante
    const queryIdProgreso = {
        text: `SELECT id_progreso FROM progreso WHERE id_estudiante = $1`,
        values: [id_estudiante]
    };
    const { rows: progresoRows } = await pool.query(queryIdProgreso);
    if (progresoRows.length === 0) {
        throw new Error('No se encontró progreso para el estudiante proporcionado.');
    }
    const id_progreso = progresoRows[0].id_progreso;

    // Insertar o actualizar la metodología de vida útil
    const query = {
        text: `
            INSERT INTO metodologia_vida_util (id_progreso, descripcion, metodologia, estado_presentacion, comentario_presentacion, fecha, id_panelista)
            VALUES ($1, $2, $3, 1, ' ', $4, 5)
            ON CONFLICT (id_progreso)
            DO UPDATE SET
                descripcion = EXCLUDED.descripcion,
                metodologia = EXCLUDED.metodologia,
                estado_presentacion = EXCLUDED.estado_presentacion,
                comentario_presentacion = EXCLUDED.comentario_presentacion,
                fecha = EXCLUDED.fecha;
        `,
        values: [id_progreso, descripcion, metodologia, fecha]
    };
    const { rows } = await pool.query(query);
    return rows;
}

export const metodologiaVidaUtilModel = {
    obtenerMetodologiaVidaUtil,
    obtenerTodoMetodologiaVidaUtil,
    insertarOActualizarMetodologiaVidaUtil
}