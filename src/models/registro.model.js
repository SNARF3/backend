
import {pool} from "../db.js"
//crear cuenta
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

//buscar por email
const buscarPorcorreo = async(correo) =>{
    const query = {
        text: `
        select * from persona
        where email=$1
        `,
        values: [correo]
    }
    const { rows }= await pool.query(query)
    return rows[0];
}
export const cuentasModel = {
    crearCuenta,
    buscarPorcorreo,
}