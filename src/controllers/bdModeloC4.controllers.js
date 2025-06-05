import { bdModeloC4Model } from "../models/bdModeloC4.model.js";
import { uploadToGoogleDrive, bdModeloC4FolderId } from "../middlewares/upload.js";
import { decodedToken } from "../middlewares/tokens.js";

export const insertarOActualizarBDyModeloC4 = async (req, res) => {
    try {
        const { token, descripcion } = req.body;
        const data = await decodedToken(token);
        const { id_cuenta } = data;
        const id_estudiante = id_cuenta;

        let bd = null;
        // Si se subió un archivo llamado 'bdModeloC4File', súbelo a Drive y guarda el link
        if (req.files?.bdFile?.[0]) {
            const file = req.files.bdFile[0];
            bd = await uploadToGoogleDrive(file.buffer, file.originalname, bdModeloC4FolderId);
        }

        let c4 = null;
        if (req.files?.c4File?.[0]) {
            const file = req.files.c4File[0];
            c4 = await uploadToGoogleDrive(file.buffer, file.originalname, bdModeloC4FolderId);
        }

        const fecha = new Date().toLocaleDateString('en-CA', { timeZone: 'America/La_Paz' });
        const resultado = await bdModeloC4Model.insertarOActualizarBDyModeloC4({ id_estudiante, descripcion, bd, c4, fecha });
        res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al insertar o actualizar la base de datos y modelo C4: " + error });
    }
}

export const BDModeloC4Controller = {
    insertarOActualizarBDyModeloC4
}