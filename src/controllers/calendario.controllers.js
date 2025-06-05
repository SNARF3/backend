import { CalendarioModel } from "../models/calendario.model.js";
import { sendEmail } from "../middlewares/sendEmail.js";
import { cuentasModel } from "../models/cuentas.model.js"; // Importar el modelo de cuentas

export const InsertarActividad = async (req, res) => {
    try {
        const { fecha, detalle } = req.body;

        if (!fecha || !detalle) {
            return res.send({
                ok: false,
                message: 'Debe ingresar todos los datos'
            });
        }

        try {
                   
            // Obtener correos de usuarios con rol 2 desde el modelo
            const usuariosRol2 = await CalendarioModel.obtenerCorreosPorRol(2);
            const correos = usuariosRol2.map(usuario => usuario.correo);

            if (correos.length === 0) {
                return res.send({
                    ok: false,
                    message: 'No se encontraron usuarios con rol 2 para enviar el mensaje',
                });
            }

            try {
                await sendEmail({
                    to: correos,
                    subject: 'Nueva Actividad Programada',
                    text: `Se ha registrado una nueva actividad:\n\nFecha: ${fecha}\nDetalle: ${detalle}\n\nSaludos,\nEquipo de UCB`
                });
                console.log('Correo enviado correctamente');
            } catch (emailError) {
                console.error('Error al enviar el correo:', emailError);
                return res.send({
                    ok: false,
                    message: 'Error al enviar el correo',
                });
            }

            return res.send({
                ok: true,
                message: 'Actividad registrada con éxito y correos enviados!',
            });
        } catch (error) {
            console.error('Error al insertar actividad:', error);
            return res.send({
                ok: false,
                message: 'Hubo un error al registrar la actividad',
            });
        }
    } catch (error) {
        console.error('Error en la inserción de actividad:', error);
        return res.send({
            ok: false,
            message: 'Hubo un error al registrar la actividad',
        });
    }
};

export const VerActividad = async (req, res) => {
    try {
        const {fecha} = req.params;
        if(!fecha){
            return res.send({
                ok: false,
                message: 'debe ingresar una fecha correcta',
            })
        }else{
            const respuesta = await CalendarioModel.VerActividad(fecha);
            return res.send(respuesta);
        }
    } catch (error) {
        return res.send({
            ok: false,
            message: 'error al obtener la fecha',
        })
    }
}

export const EliminarActividad = async (req, res) => {
    try {
        const {fecha} = req.params;
        if(!fecha){
            return res.send({
                ok: false,
                message: 'debe ingresar una fecha correcta',
            })
        }else{
            const respuesta = await CalendarioModel.EliminarActividad(fecha);
            return res.send({
                ok: true,
                message: 'Fecha Eliminada con exito',
            });
        }
    } catch (error) {
        return res.send({
            ok: false,
            message: 'error al eliminar la fecha',
        })
    }
}


export const calendarioController = {
    InsertarActividad,
    VerActividad,
    EliminarActividad,
};