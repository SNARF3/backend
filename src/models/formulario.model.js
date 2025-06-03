import { cambiarEstadoFormulario } from "../controllers/formulario.controllers.js";
import { pool } from "../db.js";

const EnviarFormularioPG = async ({
    id_cuenta,
    categoria,
    proyectoTrabajo,
    titulo_propuesta,
    detallePropuesta,
}) => {
    try {
        const query = `
            INSERT INTO carta_propuesta (
                id_cuenta,
                carta,
                nombre_propuesta,
                detalle_propuesta,
                estado,
                fecha,
                id_categoria
            ) VALUES ($1, $2, $3, $4, 1, CURRENT_DATE, $5)
            RETURNING id_formulario;
        `;
        const values = [
            id_cuenta,
            proyectoTrabajo,
            titulo_propuesta,
            detallePropuesta,
            categoria
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error al insertar el formulario:", error);
        throw error;
    }
};


const EnviarTrabajoDirigidoPG = async ({
    id_cuenta,
    proyectoTrabajo,
}) => {
    try {
        const query = `
            INSERT INTO carta_propuesta (
                id_cuenta,
                carta,
                estado,
                fecha,
                id_categoria
            ) VALUES ($1, $2, 0, CURRENT_DATE, 2)
            RETURNING id_formulario;
        `;
        const values = [id_cuenta, proyectoTrabajo];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error al insertar trabajo dirigido:", error);
        throw error;
    }
};


// Cambiar el estado del formulario
const CambiarEstadoFormulario = async (id_formulario, nuevo_estado) => {
    try {
        const query = `
            UPDATE carta_propuesta
            SET estado = $1
            WHERE id_formulario = $2
            RETURNING *;
        `;
        const values = [nuevo_estado, id_formulario];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        throw error;
    }
};

const DejarObservacion = async ({ id_formulario, id_cuenta, comentario }) => {
    try {
        const query = `
            INSERT INTO formulario_estado (
                id_formulario,
                id_cuenta,
                comentario
            ) VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [id_formulario, id_cuenta, comentario];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error al insertar comentario:", error);
        return false;
    }
};

const obtenerCategorias = async () => {
    const query = {
        text: `
        SELECT id_categoria, nombre
        FROM categoria
        `,
        values: [],
    };

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
};

export const formularioModel = {
    EnviarFormularioPG,
    CambiarEstadoFormulario,
    EnviarTrabajoDirigidoPG,
    DejarObservacion,
    obtenerCategorias
};