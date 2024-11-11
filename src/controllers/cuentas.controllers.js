import { cuentasModel } from "../models/registro.model.js";

const Registrar = async(req, res) => {
    try{
        const {nombres, apellidoPat, apellidoMat, correo, ci} = req.body;
        const user = await cuentasModel.buscarPorcorreo(email)
        if(user){
            return res.status(409).json({ok: false, msg: "Este correo ya fue registrado"})
        }
        //if()

        return res.send(rows);
    }catch(error){
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de solicitudes'
        })
    } 
}  


export const cuentasController = {
    Registrar,
}
