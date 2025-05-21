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

export const perfilModel = {
    obtenerPerfil,
    obtenerTodoPerfil,
    agregarRevision
}