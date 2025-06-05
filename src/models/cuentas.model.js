import { pool } from "../db.js";
import bcryptjs from "bcryptjs";

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

const crearUsuario = async ({ usuario, contrasenia, rol, foto_perfil, id_persona, hab }) => {
    const query = `
        INSERT INTO cuentas (usuario, contrasenia, id_rol, foto_perfil, id_persona, activo)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_cuenta;
    `;
    const values = [usuario, contrasenia, rol, foto_perfil, id_persona, hab];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0]; // Devuelve el registro creado con id_cuenta
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};

// Función para verificar las credenciales del usuario en el login
const verificarCredenciales = async (id_cuenta) => {
    try {
        const query = {
            text: `SELECT id_cuenta, contrasenia FROM cuentas WHERE id_cuenta = $1`,
            values: [id_cuenta],
        };

        const { rows } = await pool.query(query);
        console.log('Filas obtenidas:', rows);  // Imprime las filas obtenidas

        return rows.length > 0 ? rows : [];
    } catch (error) {
        console.error('Error en la consulta de credenciales:', error);
        return [];
    }
};


//buscar por email

const buscarPorcorreo = async (correo) => {
    const query = {
        text: `
            SELECT cu.*
            FROM cuentas cu
            JOIN persona p ON cu.id_persona = p.id_persona
            WHERE p.correo = $1
        `,
        values: [correo]
    };
    const { rows } = await pool.query(query);
    return rows[0];
};


const buscarPorUsuario = async (usuario) => {
    const query = {
        text: `
        SELECT cu.id_cuenta, cu.usuario, cu.contrasenia,
               per.nombres, per.apellido_paterno, per.apellido_materno,
               per.ci, per.correo, cu.id_rol
        FROM cuentas cu
        JOIN persona per ON cu.id_persona = per.id_persona
        WHERE cu.usuario = $1
        `,
        values: [usuario]
    };
    const { rows } = await pool.query(query);
    return rows;
};


const obtenerCuentasDocentesYEstudiantes = async () => {
    const query = {
        text: `
        SELECT 
            p.ci, 
            p.nombres, 
            p.apellido_paterno, 
            p.apellido_materno, 
            p.correo, 
            c.usuario, 
            c.id_rol
        FROM cuentas c
        JOIN persona p ON p.id_persona = c.id_persona
        WHERE c.id_rol IN (2, 3, 4, 5, 6)
        `,
        values: [],
    };
    const { rows } = await pool.query(query);
    return rows;
};



const verificarIdYContrasenia = async (id_usuario, contrasenia) => {
    const query = {
        text: `
        SELECT contrasenia
        FROM cuentas
        WHERE id_cuenta = $1 AND activo = true
        `,
        values: [id_usuario],   
    };

    try {
        const { rows } = await pool.query(query);

        // Si no se encuentra el usuario o la cuenta no está activa
        if (rows.length === 0) {
            return false;
        }

        const contraseniaHash = rows[0].contrasenia;

        // Comparar la contraseña proporcionada con la contraseña hasheada
        const esValido = await bcryptjs.compare(contrasenia, contraseniaHash);

        return esValido;
    } catch (error) {
        console.error('Error al verificar ID y contraseña:', error);
        throw error;
    }
};

const actualizarContrasenia = async (id_cuenta, nuevaContraseniaHash) => {
    const query = {
        text: `
        UPDATE cuentas 
        SET contrasenia = $1 
        WHERE id_cuenta = $2
        `,
        values: [nuevaContraseniaHash, id_cuenta],
    };

    try {
        const result = await pool.query(query);  // Ejecutamos la consulta
        console.log('Resultado de la consulta:', result);  // Agrega un log para ver el resultado

        // Retorna solo el rowCount para verificar las filas afectadas
        return { success: result.rowCount > 0, affectedRows: result.rowCount };
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        throw error;  // Lanzamos el error si algo sale mal
    }
};

const obtenerRoles = async () => {
    const query = {
        text: `
        SELECT id_rol, nombre_rol
        FROM roles
        WHERE id_rol > 1
        `,
        values: [],
    };

    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener roles:', error);
        throw error;
    }
};

const insertarProgreso = async ({ id_estudiante, id_curso, id_tutor, estado_progreso }) => {
    const query = `
        INSERT INTO progreso (id_estudiante, id_curso, id_tutor, estado_progreso)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [id_estudiante, id_curso, id_tutor, estado_progreso];

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Error al insertar progreso:', error);
        throw error;
    }
};

export const cuentasModel = {
    crearCuenta,
    verificarCredenciales,
    buscarPorcorreo,
    crearUsuario,
    buscarPorUsuario,
    obtenerCuentasDocentesYEstudiantes, // Nueva función añadida
    verificarIdYContrasenia,
    actualizarContrasenia,
    obtenerRoles, // Agregado al objeto de exportación
    insertarProgreso, // Agregado al objeto de exportación
};