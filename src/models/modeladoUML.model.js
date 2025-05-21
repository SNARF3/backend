import {pool} from '../db.js';

const obtenerModeladoUML = async ({id_cuenta}) => {
    const query = {
        text: 
            `select p.tipo, CONCAT(per.nombres, ' ', per.apellido_paterno, ' ', per.apellido_materno) AS nombre_completo, p.fecha, p.id_progreso
            from modelado_uml p, persona per, cuentas cu, progreso prog, curso cur
            where p.id_progreso = prog.id_progreso
            and prog.id_estudiante = cu.id_cuenta
            and cu.id_persona = per.id_persona
            and cur.id_curso = prog.id_curso
            and p.estado_modelado = 1
            and cur.id_docente = $1;
        `,
        values: [id_cuenta]
    };
    const { rows } = await pool.query(query);
    return rows;
}

const obtenerTodoModeladoUML = async ({id_progreso}) => {
    const query = {
        text: 
            `select p.descripcion, td.nombre_tipo as tipo, d.doc_diagrama as link
            from modelado_uml p, diagramas d, tipo_diagrama td
            where p.id_progreso = d.id_progreso
            and d.id_tipo = td.id_tipo
            and p.id_progreso = $1
            and estado_modelado != 3;;
        `,
        values: [id_progreso]
    }
    const { rows } = await pool.query(query);
    return rows;
}

export const modeladoUMLModel = {
    obtenerModeladoUML,
    obtenerTodoModeladoUML,
}