import { diagramasModel } from "../models/diagramas.model.js";
import { uploadToGoogleDrive, diagramasFolderId } from "../middlewares/upload.js";
import { decodedToken } from "../middlewares/tokens.js";

export const obtenerDiagramas = async (req, res) => {
    try {
        const diagramas = await diagramasModel.obtenerDiagramas({});
        res.status(200).json(diagramas);
    } catch (error) {
        console.error("Error al obtener los diagramas:", error);
        res.status(500).json({ error: "Error al obtener los diagramas" });
    }
}

export const insertarOActualizarDiagrama = async (req, res) => {
    try {
        const { token, tipo } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let diagrama = null;
        // Si se subió un archivo llamado 'diagramaUMLFile', súbelo a Drive y guarda el link
        if (req.files?.diagramaUMLFile?.[0]) {
            const file = req.files.diagramaUMLFile[0];
            diagrama = await uploadToGoogleDrive(file.buffer, file.originalname, diagramasFolderId);
        }

        const resultado = await diagramasModel.insertarOActualizarDiagrama({ id_estudiante, tipo, diagrama });
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al insertar o actualizar el diagrama:", error);
        res.status(500).json({ error: "Error al insertar o actualizar el diagrama" });
    }
}

export const diagramasController = {
    obtenerDiagramas,
    insertarOActualizarDiagrama,
};