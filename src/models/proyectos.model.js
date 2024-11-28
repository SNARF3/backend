
import {pool} from "../db.js"
const BuscarProyecto = async (categoria, titulo) => {
    try {
        const query = {
            text: `
            SELECT titulo, categoria, fecha_defensa
            FROM proyectos
            WHERE categoria ILIKE $1 OR titulo ILIKE $2;
            `,
            values: [categoria, `%${titulo}%`],
        };
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.log("Error en la búsqueda: ", error);
    }
};


export const proyectosmodel = {
    BuscarProyecto,
};