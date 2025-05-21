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

export const modeladoUMLController = {
    obtenerModeladoUML,
}