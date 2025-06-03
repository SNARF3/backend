import { metodologiaVidaUtilModel } from "../models/metodologiaVidaUtil.model.js";

export const obtenerMetodologiaVidaUtil = async (req, res) => {
    try {
        const { id_progreso } = req.params;
        const metodologiaVidaUtil = await metodologiaVidaUtilModel.obtenerMetodologiaVidaUtil({ id_progreso });
        res.status(200).json(metodologiaVidaUtil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al obtener la metodología de vida útil: " + error });
    }
}

export const metodologiaVidaUtilController = {
    obtenerMetodologiaVidaUtil,
}