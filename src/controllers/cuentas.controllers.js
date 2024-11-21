import bcryptjs from "bcryptjs";
import { cuentasModel } from "../models/cuentas.model.js";
import { sendEmail } from "../middlewares/sendEmail.js";


//dependencias instaladas:
//npm i bcryptjs
//npm i jsonwebtoken
//npm i nodemailer

const Registrar = async (req, res) => {
    try {
        const { nombres, apellidoPat, apellidoMat, correo, ci, rol } = req.body;

        const user = await cuentasModel.buscarPorcorreo(correo);
        const dominioUcb = /^[a-zA-Z0-9._%+-]+@ucb\.edu\.bo$/;
        const letras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (user) {
            return res.status(409).json({ ok: false, msg: "Este correo ya fue registrado" });
        } else if (!letras.test(nombres) || !letras.test(apellidoPat) || !letras.test(apellidoMat)) {
            return res.status(409).json({ ok: false, msg: "Los nombres y apellidos solo deben contener letras" });
        } else if (!dominioUcb.test(correo)) {
            return res.status(409).json({ ok: false, msg: "El correo debe pertenecer al dominio @ucb.edu.bo" });
        } else if (ci.length < 4) {
            return res.status(409).json({ ok: false, msg: "El Carnet de identidad ingresado es incorrecto" });
        } else {
            try {
                const newPerson = await cuentasModel.crearCuenta({ nombres, apellidoPat, apellidoMat, correo, ci });
                const id_persona = newPerson[0].id_persona; 
                const salt = await bcryptjs.genSalt(10);
                const contrasenia = await bcryptjs.hash(genPassword(ci, nombres), salt);
                const usuario = genUser(ci, apellidoPat);
                const newAccount = await cuentasModel.crearUsuario({
                    correo,
                    usuario,
                    contrasenia,
                    rol,
                    id_persona,
                    hab: 2 
                });

                // Manejo del envio del correo con los datos necesarios
                try {
                    await sendEmail({
                        to: correo,
                        subject: 'Cuenta registrada en UCB',
                        text: `Hola ${nombres} ${apellidoPat},\n\nTu cuenta ha sido registrada exitosamente en el sistema de la UCB.\n\nTu usuario es: ${usuario}\nTu contraseña es: ${genPassword(ci, nombres)}\n\nPor favor, guarda esta información en un lugar seguro.\n\nSaludos,\nEquipo de UCB`
                    });
                    console.log('Correo enviado correctamente');
                } catch (emailError) {
                    console.error('Error al enviar el correo:', emailError);
                }

                return res.status(201).json({ ok: true, msg: "Usuario registrado exitosamente", usuario: newAccount[0].id_cuenta });
            } catch (error) {
                return res.status(409).json({ ok: false, msg: "Algo pasó, no se pudo registrar: " + error });
            }
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en la carga de solicitudes: ' + error
        });
    }
};



const login = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;

        // Verificar si el usuario existe en la base de datos y obtener el rol
        const cuenta = await cuentasModel.buscarPorUsuario(usuario);

        if (!cuenta || cuenta.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparación de la contraseña (si está hasheada)
        const contraseniaValida = await bcryptjs.compare(contrasenia, cuenta[0].contrasenia);
        
        if (contraseniaValida) {
            // Obtener el rol del usuario
            const rol = cuenta[0].rol; // Asumiendo que el rol está en la respuesta de la base de datos

            return res.status(200).json({
                mensaje: 'Login exitoso',
                user: usuario,
                rol: rol // Devolvemos el rol junto con el usuario
            });
        } else {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

    } catch (error) {
        console.error('Error al loggear:', error);
        res.status(500).json({ error: 'Error al verificar credenciales' });
    }
};





// Funciones de generación de usuario y contraseña
function genPassword(ci, nombres) {
    return ci + nombres;
}

function genUser(ci, apellidoPat) {
    return apellidoPat + ci;
}

export const cuentasController = {
    Registrar,
    login
};
