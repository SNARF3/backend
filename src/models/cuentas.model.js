import { pool } from "../db.js";


const crearCuenta = async ({ nombres, apellidoPat, apellidoMat, correo, ci }) => {
    const query = {
        text: `
        INSERT INTO persona (nombres, apellido_paterno, apellido_materno, correo, ci)
        VALUES ($1, $2, $3, $4, $5) RETURNING id_persona
        `,
        values: [nombres, apellidoPat, apellidoMat, correo, ci],
    };
    const { rows } = await pool.query(query);
    return rows;
};

// Función para verificar las credenciales del usuario en el login
const verificarCredenciales = async (usuario, contrasenia) => {
    const query = {
        text: `
        SELECT rol FROM cuentas
        WHERE usuario = $1 AND contrasenia = $2 AND hab = 1
        `,
        values: [usuario, contrasenia],
    };
    const { rows } = await pool.query(query);

    // Si hay coincidencia, devuelve el rol; si no, devuelve null
    return rows.length > 0 ? rows[0].rol : null;
};

export const solicitudModel = {
    crearCuenta,
    verificarCredenciales,
};
