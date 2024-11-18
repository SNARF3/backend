import { formularioModel } from "../models/formulario.model.js";


export const enviarFormulario = async (req, res) => {
    try {
        const {
            nroDocumento,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            correo,
            categoria,
            titulo_propuesta
        } = req.body;
        console.log(req.body);
    
      // Rutas de los archivos subidos para enviarlo al insert del modelo 
        const proyectoTrabajo = req.files?.proyectoTrabajo?.[0]?.path || null;
        const detallePropuesta = req.files?.detallePropuesta?.[0]?.path || null;
    
        if (!nroDocumento || !nombres || !apellidoPaterno || !apellidoMaterno || !categoria) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
    
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
