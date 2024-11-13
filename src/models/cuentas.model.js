import { pool } from "../db.js";

const crearCuenta = async ({ nombres, apellidoPat, apellidoMat, correo, ci }) => {
    //console.log("Intentando crear cuenta con:", { nombres, apellidoPat, apellidoMat, correo, ci });
    const query = {
        text: 
        `INSERT INTO persona (nombres, apellido_paterno, apellido_materno, correo, ci)
        VALUES ($1, $2, $3, $4, $5) RETURNING id_persona
        `,
        values: [nombres, apellidoPat, apellidoMat, correo, ci],
    };
    const { rows } = await pool.query(query);
    return rows;
};

const crearUsuario = async ({correo, usuario, contrasenia, rol, id_persona, hab}) => {
    const query = {
        text: `
        INSERT INTO cuentas (correo, usuario, contrasenia, rol, id_persona, hab)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_cuenta
        `,
        values: [correo, usuario, contrasenia, rol, id_persona, hab],
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

//buscar por email

const buscarPorcorreo = async(correo) =>{
    const query = {
        text: `
        select * from persona
        where correo=$1
        `,
        values: [correo]
    }
    const { rows }= await pool.query(query)
    return rows[0];
}
const buscarPorUsuario = async (usuario) => {
    const query = {
        text: `
        SELECT contrasenia FROM cuentas WHERE usuario = $1
        `,
        values: [usuario]
    };
    const { rows } = await pool.query(query);
    return rows;
};

export const cuentasModel = {
    crearCuenta,
    verificarCredenciales,
    buscarPorcorreo,
    crearUsuario,
    buscarPorUsuario,
};