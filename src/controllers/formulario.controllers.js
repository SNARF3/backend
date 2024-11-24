import { formularioModel } from "../models/formulario.model.js";
import { decodedToken } from "../middlewares/tokens.js";

export const enviarFormulario = async (req, res) => {
    try {
        const {
            token,
            categoria,
            titulo_propuesta
        } = req.body;
        

        const data = await decodedToken(token)
        //console.log(data);
        const { nroDocumento, nombres, apellidoPaterno, apellidoMaterno, correo, id_cuenta } = data;

      // Rutas de los archivos subidos para enviarlo al insert del modelo 
        const proyectoTrabajo = req.files?.proyectoTrabajo?.[0]?.path || null;
        const detallePropuesta = req.files?.detallePropuesta?.[0]?.path || null;
        
        const formulario = await formularioModel.EnviarFormularioPG({
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
        });
    
        res.status(201).json({
            message: "Formulario enviado con éxito",
            formulario,
        });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al enviar el formulario"+error });
        }
};

export const cambiarEstadoFormulario = async (req, res) => {
    try {
        const { id_formulario, nuevo_estado } = req.params;  // Obtener los parámetros de la URL

        // Validar entrada
        if (!id_formulario || nuevo_estado === undefined) {
            return res.status(400).json({
                error: "Faltan parámetros: 'id_formulario' y/o 'nuevo_estado'",
            });
        }

        // Cambiar el estado en la base de datos
        const formularioActualizado = await formularioModel.CambiarEstadoFormulario(
            id_formulario,
            nuevo_estado
        );

        res.status(200).json({
            message: "Estado del formulario actualizado con éxito",
            formulario: formularioActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error al cambiar el estado del formulario: " + error.message,
        });
    }
};

// Insertar un registro en formulario_estado
export const insertarFormularioEstado = async (req, res) => {
    try {
        const { id_formulario, comentario } = req.body; // Obtener datos del cuerpo de la solicitud

        // Validar entrada
        if (!id_formulario || !comentario) {
            return res.status(400).json({
                error: "Faltan parámetros: 'id_formulario' y/o 'comentario'",
            });
        }

        // Insertar el registro en la base de datos
        const formularioEstado = await formularioModel.InsertarFormularioEstado({
            id_formulario,
            comentario,
        });

        res.status(201).json({
            message: "Registro insertado en formulario_estado con éxito",
            formularioEstado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error al insertar en formulario_estado: " + error.message,
        });
    }
};

export const formularioController = {
    enviarFormulario,
    cambiarEstadoFormulario,
    insertarFormularioEstado, // Exportamos la nueva función
};