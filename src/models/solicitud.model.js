
import {pool} from "../db.js"

const solicitudesPendientes = async() =>{
    const query = {
        text: `
        select formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha 
        from formulario, cuentas, formulario_estado 
        where formulario.id_formulario=formulario_estado.id_formulario 
        and formulario_estado.id_cuenta=cuentas.id_cuenta 
        and cuentas.hab=1 
        and cuentas.hab=1 
        group by formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha
        ` 
    }
    const { rows }= await pool.query(query)
    return rows;
}

export const solicitudModel = {
    solicitudesPendientes
}