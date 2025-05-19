import {perfilModel} from '../models/perfil.model.js';
import {modeladoUMLModel} from '../models/modeladoUML.model.js';
import {analisisPreliminarModel} from '../models/analisisPreliminar.model.js';
import {marcoTeoricoModel} from '../models/marcoTeorico.model.js';
import {bdModeloC4Model} from '../models/bdModeloC4.model.js';
import {metodologiaVidaUtilModel} from '../models/metodologiaVidaUtil.model.js';
import { decodedToken } from "../middlewares/tokens.js";

export const obtenerTodasRevisiones = async (req, res) => {
    try {
        const { token } = req.body;
        const data = await decodedToken(token);
        const { nroDocumento, nombres, apellidoPaterno, apellidoMaterno, correo, id_cuenta } = data;

        const [marcoTeorico, analisisPreliminar, perfil, modeladoUML, bdModeloC4, metodologiaVidaUtil] = await Promise.all([
            marcoTeoricoModel.obtenerMarcoTeorico({ id_cuenta }),
            analisisPreliminarModel.obtenerAnalisisPreliminar({ id_cuenta }),
            perfilModel.obtenerPerfil({ id_cuenta }),
            modeladoUMLModel.obtenerModeladoUML({ id_cuenta }),
            bdModeloC4Model.obtenerBDyModeloadoC4({ id_cuenta }),
            metodologiaVidaUtilModel.obtenerMetodologiaVidaUtil({ id_cuenta })
        ]);

        const todasLasRevisiones = [
            ...perfil,
            ...marcoTeorico,
            ...analisisPreliminar,
            ...modeladoUML,
            ...bdModeloC4,
            ...metodologiaVidaUtil
        ];

        return res.json({
            ok: true,
            msg: 'Revisiones obtenidas correctamente',
            data: todasLasRevisiones
        });
    } catch (error) {   
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener las revisiones',
        });
    }
}

export const revisionesController = {
    obtenerTodasRevisiones,
}