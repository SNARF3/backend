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

export const marcoTeoricoModel = {
    obtenerMarcoTeorico,
    obtenerTodoMarcoTeorico,
}