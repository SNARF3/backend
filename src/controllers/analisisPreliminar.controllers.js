import {analisisPreliminarModel} from '../models/analisisPreliminar.model.js';
import { decodedToken } from "../middlewares/tokens.js";
import { uploadToGoogleDrive, analisisPreliminarFolderId } from "../middlewares/upload.js";

export const insertarOActualizarAnalisisPreliminar = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let requerimientos = null;
        // Si se subió un archivo llamado 'bdModeloC4File', súbelo a Drive y guarda el link
        if (req.files?.requerimientosFile?.[0]) {
            const file = req.files.requerimientosFile[0];
            requerimientos = await uploadToGoogleDrive(file.buffer, file.originalname, analisisPreliminarFolderId);
        }

        let wireframes = null;
        if (req.files?.wireframesFile?.[0]) {
            const file = req.files.wireframesFile[0];
            wireframes = await uploadToGoogleDrive(file.buffer, file.originalname, analisisPreliminarFolderId);
        }

        const fecha = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await analisisPreliminarModel.insertarOActualizarAnalisisPreliminar ({ id_estudiante, descripcion, requerimientos, wireframes, fecha });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar el analisis preliminar: " + error });
    }
}

export const analisisPreliminarController = {
    insertarOActualizarAnalisisPreliminar
}

