import { formularioModel } from "../models/formulario.model.js";
import { decodedToken } from "../middlewares/tokens.js";

export const enviarFormulario = async (req, res) => {
    try {
        const {
            token,
            categoria,
            titulo_propuesta
        } = req.body;
    
      // Rutas de los archivos subidos para enviarlo al insert del modelo 
        const proyectoTrabajo = req.files?.proyectoTrabajo?.[0]?.path || null;
        const detallePropuesta = req.files?.detallePropuesta?.[0]?.path || null;
        
        const data = await decodedToken(token)
        //console.log(data);
        const { nroDocumento, nombres, apellidoPaterno, apellidoMaterno, correo, id_cuenta } = data;
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

export const formularioController ={
    enviarFormulario,
}
