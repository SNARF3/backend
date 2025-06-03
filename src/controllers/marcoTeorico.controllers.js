import { marcoTeoricoModel } from "../models/marcoTeorico.model.js";

export const obtenerMarcoTeorico = async (req, res) => {
    try {
        const { id_progreso } = req.params;
        const marcoTeorico = await marcoTeoricoModel.obtenerMarcoTeorico({ id_progreso });
        res.status(200).json(marcoTeorico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al obtener el marco teórico: " + error });
    }
}

export const marcoTeoricoController = {
    obtenerMarcoTeorico,
}