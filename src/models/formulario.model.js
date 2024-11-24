import { cambiarEstadoFormulario } from "../controllers/formulario.controllers.js";
import { pool } from "../db.js";

const EnviarFormularioPG = async ({
    nroDocumento,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    correo,
    categoria,
    proyectoTrabajo,
    titulo_propuesta,
    detallePropuesta,
    id_cuenta,
}) => {
    try {
        const query = `
            INSERT INTO formulario (
                ci,
                nombres,
                apellido_paterno,
                apellido_materno,
                correo,
                categoria,
                carta,
                nombre_propuesta,     
                detalle_propuesta,
                estado,
                tipo,
                fecha,
                id_cuenta    
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id_formulario;
    `;
    const values = [nroDocumento ,nombres, apellidoPaterno, apellidoMaterno, correo, categoria, proyectoTrabajo, titulo_propuesta, detallePropuesta, 1, 1, 'now()', id_cuenta];
    const result = await pool.query(query, values);
    return result.rows[0]; // Devuelve el registro insertado
    } catch (error) {
        console.error("Error al insertar el formulario:", error);
        throw error;
    }
};


// Cambiar el estado del formulario
const CambiarEstadoFormulario = async (id_formulario, nuevo_estado) => {
    try {
        const query = `
            UPDATE formulario
            SET estado = $1
            WHERE id_formulario = $2
            RETURNING *;
        `;
        const values = [nuevo_estado, id_formulario];
        const result = await pool.query(query, values);
        return result.rows[0]; // Devuelve el formulario actualizado
    } catch (error) {
        console.error("Error al cambiar el estado del formulario:", error);
        throw error;
    }
};


const RegistroRelation = async ({id_cuenta, id_formulario})=>{

}


// Insertar un registro en la tabla formulario_estado
const InsertarFormularioEstado = async ({ id_formulario, comentario }) => {
    try {
        const query = `
            INSERT INTO formulario_estado (
                id_formulario,
                id_cuenta,
                comentario
            ) VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [id_formulario, 1, comentario]; // id_cuenta se fija en 1
        const result = await pool.query(query, values);
        return result.rows[0]; // Devuelve el registro insertado
    } catch (error) {
        console.error("Error al insertar en formulario_estado:", error);
        throw error;
    }
};

export const formularioModel = {
    EnviarFormularioPG,
    CambiarEstadoFormulario,
    InsertarFormularioEstado, // Exportamos la nueva función
};