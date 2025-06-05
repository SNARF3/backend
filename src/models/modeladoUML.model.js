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
            and estado_modelado != 3;
        `,
        values: [id_progreso]
    }
    const { rows } = await pool.query(query);
    return rows;
}

const InsertarOActualizarModeladoUML = async ({id_estudiante, descripcion, fecha}) => {
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
        text: 
            `insert into modelado_uml (id_progreso, descripcion, estado_modelado, fecha, comentario_modelado)
            values ($1, $2, 1, $3, ' ')
            on conflict (id_progreso)
            do update set 
            descripcion = excluded.descripcion,
            estado_modelado = excluded.estado_modelado,
            fecha = excluded.fecha,
            comentario_modelado = excluded.comentario_modelado;
        `,
        values: [id_progreso, descripcion, fecha]
    };
    const { rows } = await pool.query(query);
    return rows[0];
}

export const modeladoUMLModel = {
    obtenerModeladoUML,
    obtenerTodoModeladoUML,
    InsertarOActualizarModeladoUML
}