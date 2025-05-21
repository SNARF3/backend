import { pool } from "../db.js";

export class ProyectosModel {
    static async buscar({ anio, modalidad, titulo, tutor, limit = 10, offset = 0 }) {
        const conditions = [];
        const values = [];
        let paramIndex = 1;

        if (anio) {
            conditions.push(`date_part('year', p.fechadefensa) = $${paramIndex}`);
            values.push(anio);
            paramIndex++;
        }

        if (modalidad) {
            conditions.push(`m.cod_modalidad = $${paramIndex}`);
            values.push(`${modalidad}`);
            paramIndex++;
        }

        if (titulo) {
            conditions.push(`p.titulo ILIKE $${paramIndex}`);
            values.push(`%${titulo}%`);
            paramIndex++;
        }

        if (tutor) {
            conditions.push(`p.tutor ILIKE $${paramIndex}`);
            values.push(`%${tutor}%`);
            paramIndex++;
        }

        values.push(limit, offset);

        const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
        const query = `
            SELECT 
                p.cod_proyecto, p.titulo, p.estudiante, p.tutor,
                p.fechadefensa, p.nota, m.descripcion as modalidad
            FROM proyectos p
            JOIN modalidad m ON p.cod_modalidad = m.cod_modalidad
            ${whereClause}
            ORDER BY p.fechadefensa DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;

        const { rows } = await pool.query(query, values);
        return rows;
    }
}