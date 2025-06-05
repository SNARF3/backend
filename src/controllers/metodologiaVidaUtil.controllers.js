import { metodologiaVidaUtilModel } from "../models/metodologiaVidaUtil.model.js";
import { uploadToGoogleDrive, metodologiaVidaUtilFolderId } from "../middlewares/upload.js";
import { decodedToken } from "../middlewares/tokens.js";

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

export const insertarOActualizarMetodologiaVidaUtil = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let metodologia = null;
        // Si se subió un archivo llamado 'metodologiaVidaUtilFile', súbelo a Drive y guarda el link
        if (req.files?.metodologiaVidaUtilFile?.[0]) {
            const file = req.files.metodologiaVidaUtilFile[0];
            metodologia = await uploadToGoogleDrive(file.buffer, file.originalname, metodologiaVidaUtilFolderId);
        }

        const fecha = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await metodologiaVidaUtilModel.insertarOActualizarMetodologiaVidaUtil({ id_estudiante, descripcion, metodologia, fecha });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar la metodología de vida útil: " + error });
    }
}

export const metodologiaVidaUtilController = {
    obtenerMetodologiaVidaUtil,
    insertarOActualizarMetodologiaVidaUtil
}