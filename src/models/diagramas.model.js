import {pool} from '../db.js';

const obtenerDiagramas = async ({}) => {
    const query = {
        text: 
            `select *
            from tipo_diagrama;`
    };
    const { rows } = await pool.query(query);
    return rows;
}

const insertarOActualizarDiagrama = async ({id_cuenta, tipo, diagrama}) => {
    const queryIdProgreso = {
        text: `SELECT id_progreso FROM progreso WHERE id_estudiante = $1`,
        values: [id_cuenta]
    };
    const { rows: progresoRows } = await pool.query(queryIdProgreso);
    if (progresoRows.length === 0) {
        throw new Error('No se encontró progreso para el estudiante proporcionado.');
    }
    const id_progreso = progresoRows[0].id_progreso;
    const queryTipo = {
        text: `SELECT id_tipo FROM tipo_diagrama WHERE nombre_tipo = $1`,
        values: [tipo]
    };
    const { rows: tipoRows } = await pool.query(queryTipo);
    if (tipoRows.length === 0) {
        const insertTipoQuery = {
            text: `INSERT INTO tipo_diagrama (nombre_tipo) VALUES ($1) RETURNING id_tipo;`,
            values: [tipo]
        };
        const { rows: newTipoRows } = await pool.query(insertTipoQuery);
        if (newTipoRows.length === 0) {
            throw new Error('No se pudo insertar el nuevo tipo de diagrama.');
        }
        tipoRows.push(newTipoRows[0]);
    }
    const id_tipo = tipoRows[0].id_tipo;
    const existe = await pool.query(
        'SELECT 1 FROM diagramas WHERE id_progreso = $1 AND id_tipo = $2',
        [id_progreso, id_tipo]
    );

    if (existe.rowCount > 0) {
        await pool.query(
            'UPDATE diagramas SET doc_diagrama = $1 WHERE id_progreso = $2 AND id_tipo = $3',
            [diagrama, id_progreso, id_tipo]
        );
    } else {
        await pool.query(
            'INSERT INTO diagramas (id_progreso, id_tipo, doc_diagrama) VALUES ($1, $2, $3)',
            [id_progreso, id_tipo, diagrama]
        );
    }
}

export const diagramasModel = {
    obtenerDiagramas,
    insertarOActualizarDiagrama,
}