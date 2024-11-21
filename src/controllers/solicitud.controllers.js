import { solicitudModel } from "../models/solicitud.model.js";

const solicitudesPendientes = async(req, res) => {
    try{
        const rows = await solicitudModel.solicitudesPendientes();
        return res.send(rows);
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de solicitudes'
        })
    }
}  
const solicitudesPendId = async(req, res) => {
    try{
        const {id_formulario} = req.params;
        const rows = await solicitudModel.solicitudPendId(id_formulario);
        return res.send(rows);
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de la solicitud'+ error
        })
    }
}  

export const solicitudController = {
    solicitudesPendientes,
    solicitudesPendId,
}
