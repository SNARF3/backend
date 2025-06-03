import { pool } from '../db.js';

const obtenerBDyModeloadoC4 = async ({ id_cuenta }) => {
    const query = {
        text:
            `select p.tipo, CONCAT(per.nombres, ' ', per.apellido_paterno, ' ', per.apellido_materno) AS nombre_completo, p.fecha, p.id_progreso
            from bd_modelo_c4 p, persona per, cuentas cu, progreso prog, curso cur
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

const insertarOActualizarBDyModeloC4 = async ({ id_estudiante, descripcion, bd, c4, fecha }) => {
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

    // Insertar o actualizar la base de datos y modelo C4
    const query = {
        text: `
            INSERT INTO bd_modelo_c4 (id_progreso, descripcion, bd, c4, estado_presentacion, comentario_presentacion, fecha)
            VALUES ($1, $2, $3, $4, 1, ' ', $5)
            ON CONFLICT (id_progreso)
            DO UPDATE SET
                descripcion = EXCLUDED.descripcion,
                bd = EXCLUDED.bd,
                c4 = EXCLUDED.c4,
                estado_presentacion = EXCLUDED.estado_presentacion,
                comentario_presentacion = EXCLUDED.comentario_presentacion,
                fecha = EXCLUDED.fecha;
        `,
        values: [id_progreso, descripcion, bd, c4, fecha]
    };
    const { rows } = await pool.query(query);
    return rows;
}

export const bdModeloC4Model = {
    obtenerBDyModeloadoC4,
    insertarOActualizarBDyModeloC4
}