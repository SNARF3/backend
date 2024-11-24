import { solicitudModel } from "../models/solicitud.model.js";

const solicitudesPendientes = async (req, res) => {
    try {
        const { estado } = req.params;
        const rows = await solicitudModel.solicitudesPendientes(estado);
        return res.send(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de solicitudes',
        });
    }
};

const solicitudesPendId = async (req, res) => {
    try {
        const { id_formulario } = req.params;
        const rows = await solicitudModel.solicitudPendId(id_formulario);
        return res.send(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de la solicitud: ' + error,
        });
    }
};

const solicitudesPorEstado = async (req, res) => {
    try {
        const rows = await solicitudModel.solicitudesPorEstado();
        return res.send(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener las solicitudes por estado',
        });
    }
};

export const solicitudController = {
    solicitudesPendientes,
    solicitudesPendId,
    solicitudesPorEstado, // Nueva función añadida
};
