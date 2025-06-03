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

export const diagramasModel = {
    obtenerDiagramas,
}