import { diagramasModel } from "../models/diagramas.model.js";

export const obtenerDiagramas = async (req, res) => {
    try {
        const diagramas = await diagramasModel.obtenerDiagramas({});
        res.status(200).json(diagramas);
    } catch (error) {
        console.error("Error al obtener los diagramas:", error);
        res.status(500).json({ error: "Error al obtener los diagramas" });
    }
}

export const diagramasController = {
    obtenerDiagramas,
};