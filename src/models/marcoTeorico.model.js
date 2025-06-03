import {pool} from '../db.js';

const obtenerMarcoTeorico = async ({id_cuenta}) => {
    const query = {
        text: 
            `select p.tipo, CONCAT(per.nombres, ' ', per.apellido_paterno, ' ', per.apellido_materno) AS nombre_completo, p.fecha_marco, p.id_progreso
            from marco_teorico p, persona per, cuentas cu, progreso prog, curso cur
            where p.id_progreso = prog.id_progreso
            and prog.id_estudiante = cu.id_cuenta
            and cu.id_persona = per.id_persona
            and cur.id_curso = prog.id_curso
            and p.estado_marco = 1
            and cur.id_docente = $1; 
        `,
        values: [id_cuenta]
    };
    const { rows } = await pool.query(query);
    return rows;
}

const obtenerTodoMarcoTeorico = async ({id_progreso}) => {
    const query = {
        text: 
            `select p.descripcion, p.tipo, p.marco_teorico as link
            from marco_teorico p
            where id_progreso = $1
            and estado_marco != 3;
        `,
        values: [id_progreso]
    }
    const { rows } = await pool.query(query);
    return rows;
}

const insertarOActualizarMarcoTeorico = async ({ id_estudiante, descripcion, marco_teorico, fecha_marco }) => {
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

    // Insertar o actualizar el marco teórico
    const query = {
        text: `
            INSERT INTO marco_teorico (id_progreso, descripcion, marco, estado_marco, comentario_marco, fecha_marco)
            VALUES ($1, $2, $3, 1, ' ', $4)
            ON CONFLICT (id_progreso)
            DO UPDATE SET
                descripcion = EXCLUDED.descripcion,
                marco = EXCLUDED.marco,
                estado_marco = EXCLUDED.estado_marco,
                comentario_marco = EXCLUDED.comentario_marco,
                fecha_marco = EXCLUDED.fecha_marco;
        `,
        values: [id_progreso, descripcion, marco_teorico, fecha_marco]
    };
    const { rows } = await pool.query(query);
    return rows;
}

export const marcoTeoricoModel = {
    obtenerMarcoTeorico,
    obtenerTodoMarcoTeorico,
    insertarOActualizarMarcoTeorico
}