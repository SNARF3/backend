import { perfilModel } from "../models/perfil.model.js";
import { uploadToGoogleDrive, perfilesFolderId } from "../middlewares/upload.js";

import { decodedToken } from "../middlewares/tokens.js";

export const obtenerPerfil = async (req, res) => {
    try {
        const { id_progreso } = req.params;
        const perfil = await perfilModel.obtenerTodoPerfil({ id_progreso });
        res.status(200).json(perfil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al obtener el perfil: " + error });
    }
}

export const insertarOActualizarPerfil = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let perfil = null;
        // Si se subió un archivo llamado 'perfilFile', súbelo a Drive y guarda el link
        if (req.files?.perfilFile?.[0]) {
            const file = req.files.perfilFile[0];
            perfil = await uploadToGoogleDrive(file.buffer, file.originalname, perfilesFolderId);
        }

        const fecha_entrega = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await perfilModel.insertarOActualizarPerfil({ id_estudiante, descripcion, perfil, fecha_entrega });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar el perfil: " + error });
    }
}

export const perfilController = {
    obtenerPerfil,
    insertarOActualizarPerfil
}