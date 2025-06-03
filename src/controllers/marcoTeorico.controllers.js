import { marcoTeoricoModel } from "../models/marcoTeorico.model.js";
import { uploadToGoogleDrive, marcoTeoricoFolderId } from "../middlewares/upload.js";
import { decodedToken } from "../middlewares/tokens.js";

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

export const insertarOActualizarMarcoTeorico = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let marco_teorico = null;
        // Si se subió un archivo llamado 'marcoTeoricoFile', súbelo a Drive y guarda el link
        if (req.files?.marcoTeoricoFile?.[0]) {
            const file = req.files.marcoTeoricoFile[0];
            marco_teorico = await uploadToGoogleDrive(file.buffer, file.originalname, marcoTeoricoFolderId);
        }

        const fecha_marco = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await marcoTeoricoModel.insertarOActualizarMarcoTeorico({ id_estudiante, descripcion, marco_teorico, fecha_marco });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar el marco teórico: " + error });
    }
}

export const marcoTeoricoController = {
    obtenerMarcoTeorico,
    insertarOActualizarMarcoTeorico
}