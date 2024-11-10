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

export const solicitudController = {
    solicitudesPendientes
}
