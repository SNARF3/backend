import {pool} from "../db.js"

const obtenerCorreosPorRol = async (rol) => {
    const query = {
        text: `
        SELECT p.correo
        FROM cuentas c
        JOIN persona p ON c.id_persona = p.id_persona
        WHERE c.id_rol = $1 AND c.activo = true
        `,
        values: [rol],
    };

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener correos por rol:', error);
        throw error;
    }
};

const InsertarActividad = async (Fecha, Detalle) => {
    try {
        const query = {
            text: `
            INSERT INTO calendario (fecha, detalle)
            VALUES ($1, $2)
            RETURNING id_fecha
            `,
            values: [Fecha, Detalle],
        };
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.log("Error Al insertar la fecha: ", error);
    }
};
const VerActividad = async (Fecha) => {
    try {
        const query = {
            text: `
            SELECT id_fecha, fecha, detalle
            FROM calendario
            WHERE date(fecha)=$1
            `,
            values: [Fecha],
        };
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.log("Error al ver la fecha: ", error);
    }
};

const EliminarActividad = async (Fecha) => {
    try {
        const query = {
            text: `
            DELETE FROM calendario
            WHERE date(fecha)=$1
            `,
            values: [Fecha],
        };
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.log("Error al ver la fecha: ", error);
    }
};

export const CalendarioModel = {
    InsertarActividad,
    VerActividad,
    EliminarActividad,
    obtenerCorreosPorRol
};