import {pool} from '../db.js';

const obtenerPerfil = async ({id_cuenta}) => {
    const query = {
        text: 
            `select p.tipo, CONCAT(per.nombres, ' ', per.apellido_paterno, ' ', per.apellido_materno) AS nombre_completo, p.fecha_entrega, p.id_progreso
            from perfil p, persona per, cuentas cu, progreso prog, curso cur
            where p.id_progreso = prog.id_progreso
            and prog.id_estudiante = cu.id_cuenta
            and cu.id_persona = per.id_persona
            and cur.id_curso = prog.id_curso
            and p.estado_perfil = 1
            and cur.id_docente = $1;
        `,
        values: [id_cuenta]
    };
    const { rows } = await pool.query(query);
    return rows;
}

const obtenerTodoPerfil = async ({id_progreso}) => {
    const query = {
        text: 
            `select p.descripcion, p.tipo, p.perfil as link
            from perfil p
            where id_progreso = $1
            and estado_perfil != 3;
        `,
        values: [id_progreso]
    }
    const { rows } = await pool.query(query);
    return rows;
}

const agregarRevision = async (estado_perfil, comentario,  id_progreso) => {
    const query = {
        text: 
            `update perfil
            set estado_perfil = $1, comentario = $2
            where id_progreso = $3;
        `,
        values: [estado_perfil, comentario, id_progreso]
    };
    const { rows } = await pool.query(query);
    return rows;
}

const insertarOActualizarPerfil = async ({ id_estudiante, descripcion, perfil,fecha_entrega }) => {
    const queryIdProgreso = {
        text: `SELECT id_progreso FROM progreso WHERE id_estudiante = $1`,
        values: [id_estudiante]
    };
    const { rows: progresoRows } = await pool.query(queryIdProgreso);
    if (progresoRows.length === 0) {
        throw new Error('No se encontró progreso para el estudiante proporcionado.');
    }
    const id_progreso = progresoRows[0].id_progreso;

    const query = {
        text: `
            INSERT INTO perfil (id_progreso, descripcion, perfil, estado_perfil, comentario_perfil, fecha_entrega)
            VALUES ($1, $2, $3, 1, ' ', $4)
            ON CONFLICT (id_progreso)
            DO UPDATE SET
                descripcion = EXCLUDED.descripcion,
                perfil = EXCLUDED.perfil,
                estado_perfil = EXCLUDED.estado_perfil,
                comentario_perfil = EXCLUDED.comentario_perfil,
                fecha_entrega = EXCLUDED.fecha_entrega;
        `,
        values: [id_progreso, descripcion, perfil, fecha_entrega]
    };
    const { rows } = await pool.query(query);
    return rows;
}

export const perfilModel = {
    obtenerPerfil,
    obtenerTodoPerfil,
    agregarRevision,
    insertarOActualizarPerfil
}