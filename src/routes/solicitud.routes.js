import { Router } from "express";
import {pool} from "../db.js"

const router = Router();

router.get("/solicitudesPendientes", async(req, res) => {
    const {rows} = await pool.query("select formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha from formulario, cuentas, formulario_estado where formulario.id_formulario=formulario_estado.id_formulario and formulario_estado.id_cuenta=cuentas.id_cuenta and cuentas.hab=1 and cuentas.hab=1 group by formulario.ci, formulario.nombres, formulario.apellido_paterno, formulario.apellido_materno, formulario.nombre_propuesta, formulario.fecha" )
    res.send(rows);
});

export default router;
