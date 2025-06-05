import { modeladoUMLModel } from "../models/modeladoUML.model.js";

export const obtenerModeladoUML = async (req, res) => {
    try {
        const { id_progreso } = req.params;
        const modeladoUML = await modeladoUMLModel.obtenerModeladoUML({ id_progreso });
        res.status(200).json(modeladoUML);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al obtener el modelado UML: " + error });
    }
}

export const insertarOActualizarModeladoUML = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        const fecha_modelado = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await modeladoUMLModel.insertarOActualizarModeladoUML({ id_estudiante, descripcion, fecha });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar el modelado UML: " + error });
    }
}

export const modeladoUMLController = {
    obtenerModeladoUML,
    insertarOActualizarModeladoUML,
}