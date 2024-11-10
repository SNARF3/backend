
import {pool} from "../db.js"

const crearCuenta = async({nombres, apellidoPat, apellidoMat, correo, ci}) =>{
    const query = {
        text: `
        insert into persona (nombres, apellido_paterno, apellido_materno, correo, ci) values ($1, $2, $3, $4, $5 ) returning id_persona
        ` ,
        values: [nombres, apellidoPat, apellidoMat, correo, ci]
    }
    const { rows }= await pool.query(query)
    return rows;
}

export const solicitudModel = {
    solicitudesPendientes
}