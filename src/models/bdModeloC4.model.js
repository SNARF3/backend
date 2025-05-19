import {pool} from '../db.js';

const obtenerBDyModeloadoC4 = async ({id_cuenta}) => {
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

export const bdModeloC4Model = {
    obtenerBDyModeloadoC4,
}