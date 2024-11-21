
import {pool} from "../db.js"

const solicitudesPendientes = async() =>{
    const query = {
      text: `
      select formulario.id_formulario, formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha 
      from formulario, cuentas, formulario_estado 
      where formulario.id_formulario=formulario_estado.id_formulario 
      and formulario_estado.id_cuenta=cuentas.id_cuenta 
      and cuentas.hab=1 
      and formulario.estado=1
      group by formulario.id_formulario, formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha
      `,
};
    const { rows }= await pool.query(query)
    return rows;
}

const solicitudPendId = async(id_formulario) =>{
    const query = {
        text: `
        select formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.carta, formulario.detalle_propuesta, formulario.nombre_propuesta
        from formulario
        where id_formulario=$1
        `,
        values: [id_formulario],
    }
    const { rows }= await pool.query(query)
    return rows;
}

export const solicitudModel = {
    solicitudesPendientes,
    solicitudPendId,
}