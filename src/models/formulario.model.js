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
                tipo,
                fecha     
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id_formulario;
    `;
    const values = [nroDocumento ,nombres, apellidoPaterno, apellidoMaterno, correo, categoria, proyectoTrabajo, titulo_propuesta, detallePropuesta, 1, 'now()'];
    const result = await pool.query(query, values);
    return result.rows[0]; // Devuelve el registro insertado
    } catch (error) {
        console.error("Error al insertar el formulario:", error);
        throw error;
    }
};

const RegistroRelation = async ({id_cuenta, id_formulario})=>{

}

export const formularioModel = {
    EnviarFormularioPG,
};
