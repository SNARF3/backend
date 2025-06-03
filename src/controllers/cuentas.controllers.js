import bcryptjs from "bcryptjs";
import { cuentasModel } from "../models/cuentas.model.js";
import { sendEmail } from "../middlewares/sendEmail.js";
import {generarToken} from "../middlewares/tokens.js"


//dependencias instaladas:
//npm i bcryptjs
//npm i jsonwebtoken
//npm i nodemailer
//npm i jwt_decode

const Registrar = async (req, res) => {
    try {
        const { nombres, apellidoPat, apellidoMat, correo, ci, rol} = req.body; // Agregamos id_curso e id_tutor
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
        } else if (![1, 2, 3, 4, 5, 6].includes(Number(rol))) {
            return res.status(409).json({ ok: false, msg: "Rol inválido. Debe ser 0 (Admin), 1 (Docente) o 2 (Estudiante)" });
        } else {
            try {
                const newPerson = await cuentasModel.crearCuenta({ nombres, apellidoPat, apellidoMat, correo, ci });
                const id_persona = newPerson[0].id_persona; 
                const salt = await bcryptjs.genSalt(10);
                const contrasenia = await bcryptjs.hash(genPassword(ci, apellidoPat), salt);
                const usuario = genUser(ci, apellidoPat);
                const newAccount = await cuentasModel.crearUsuario({
                    usuario,
                    contrasenia,
                    rol,
                    foto_perfil:  "",
                    id_persona,
                    hab: true 
                });

                // Verifica que `newAccount` contenga `id_cuenta`
                if (!newAccount || !newAccount.id_cuenta) {
                    throw new Error("No se pudo obtener el id_cuenta del usuario creado");
                }

                // Si el rol es 3 (Estudiante), insertar en la tabla progreso
                if (rol === 3) {
                    try {
                        await cuentasModel.insertarProgreso({
                            id_estudiante: newAccount.id_cuenta, // Usamos el id_cuenta del estudiante creado
                            id_curso: null, // Insertamos null en lugar de 0
                            id_tutor: null, // Insertamos null en lugar de 0
                            estado_progreso: 0 // Estado inicial
                        });
                    } catch (progresoError) {
                        console.error('Error al insertar progreso:', progresoError);
                        return res.status(500).json({ ok: false, msg: 'Error al insertar progreso' });
                    }
                }

                // Manejo del envio del correo con los datos necesarios
                try {
                    await sendEmail({
                        to: correo,
                        subject: 'Cuenta registrada en UCB',
                        text: `Hola ${nombres} ${apellidoPat},\n\nTu cuenta ha sido registrada exitosamente en el sistema de la UCB.\n\nTu usuario es: ${usuario}\nTu contraseña es: ${genPassword(ci, apellidoPat)}\n\nPor favor, guarda esta información en un lugar seguro.\n\nSaludos,\nEquipo de UCB`
                    });
                    console.log('Correo enviado correctamente');
                } catch (emailError) {
                    console.error('Error al enviar el correo:', emailError);
                }

                return res.status(201).json({ ok: true, msg: "Usuario registrado exitosamente" });
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
        const { usuario, contraseniaUser } = req.body;

        if (!usuario || !contraseniaUser) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son obligatorios' });
        }

        console.log(usuario, contraseniaUser);

        // Buscar usuario
        const usuarioEncontradoArray = await cuentasModel.buscarPorUsuario(usuario);

        if (!usuarioEncontradoArray || usuarioEncontradoArray.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        const usuarioEncontrado = usuarioEncontradoArray[0];

        const {
            id_cuenta,
            contrasenia,
            nombres,
            apellido_paterno,
            apellido_materno,
            ci,
            id_rol,
            correo // Asegúrate que esta columna existe en tu SELECT
        } = usuarioEncontrado;

        // Comparar contraseñas (aquí debes usar bcrypt si están hasheadas)
        const contraseniaValida = await bcryptjs.compare(contraseniaUser, contrasenia);
        //const contraseniaValida = true; // Solo para pruebas, ¡no lo dejes así en producción!

        if (!contraseniaValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuarioGen = {
            id_cuenta,
            nombres,
            apellidoPaterno: apellido_paterno,
            apellidoMaterno: apellido_materno,
            nroDocumento: ci,
            correo: correo || "", // Fallback si viene undefined
            rol: id_rol,
            usuario
        };

        console.log('Usuario generado para el token:', usuarioGen);

        const token = generarToken(usuarioGen);

        return res.status(200).json({
            mensaje: 'Login exitoso',
            token: `Bearer ${token}`,
            rol: id_rol,
            id_cuenta
        });

    } catch (error) {
        console.error('Error al loggear:', error);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
    }
};


const obtenerDocentesYEstudiantes = async (req, res) => {
    try {
        // Llama al modelo para obtener las cuentas de docentes y estudiantes
        const cuentas = await cuentasModel.obtenerCuentasDocentesYEstudiantes();

        // Responde con éxito y los datos obtenidos
        return res.status(200).json({ 
            ok: true, 
            cuentas 
        });
    } catch (error) {
        // Loguea el error para depuración
        console.error('Error al obtener docentes y estudiantes:', error);

        // Envía una respuesta de error al cliente
        return res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener las cuentas de docentes y estudiantes' 
        });
    }
};


const cambiarContrasenia = async (req, res) => {
    try {
        const { id_cuenta, nuevaContrasenia } = req.body;

        // Validar que todos los campos estén presentes
        if (!id_cuenta || !nuevaContrasenia) {
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios',
            });
        }


        // Generar el hash para la nueva contraseña
        const salt = await bcryptjs.genSalt(10);
        const nuevaContraseniaHash = await bcryptjs.hash(nuevaContrasenia, salt);

        // Actualizar la contraseña en la base de datos
        const resultado = await cuentasModel.actualizarContrasenia(id_cuenta, nuevaContraseniaHash);

        // Verificar el resultado de la actualización
        if (resultado.success && resultado.affectedRows > 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Contraseña actualizada exitosamente',
            });
        } else {
            console.log(`Filas afectadas: ${resultado.affectedRows}`);
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo actualizar la contraseña o no se encontró el usuario',
            });
        }
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor al cambiar la contraseña',
            error: error.message
        });
    }
};


const verificarIdYContrasenia = async (req, res) => {
    try {
        const { id_cuenta, contrasenia } = req.body;

        // Validar que todos los campos estén presentes
        if (!id_cuenta || !contrasenia) {
            return res.status(400).json({
                ok: false,
                msg: 'ID de usuario y contraseña son obligatorios',
            });
        }

        // Verificar si el ID y la contraseña son válidos
        const esValido = await cuentasModel.verificarIdYContrasenia(id_cuenta, contrasenia);

        if (esValido) {
            return res.status(200).json({
                ok: true,
                msg: 'ID y contraseña válidos',
            });
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'ID o contraseña incorrectos, o la cuenta no está activa',
            });
        }
    } catch (error) {
        console.error('Error al verificar ID y contraseña:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor al verificar ID y contraseña',
            error: error.message,
        });
    }
};


const obtenerRoles = async (req, res) => {
    try {
        // Llama al modelo para obtener los roles
        const roles = await cuentasModel.obtenerRoles();

        // Responde con éxito y los datos obtenidos
        return res.status(200).json({
            ok: true,
            roles,
        });
    } catch (error) {
        // Loguea el error para depuración
        console.error('Error al obtener roles:', error);

        // Envía una respuesta de error al cliente
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener los roles',
            error: error.message,
        });
    }
};


// Funciones de generación de usuario y contraseña
function genPassword(ci, apellidoPat) {
    return ci + apellidoPat;
}

function genUser(ci, apellidoPat) {
    return apellidoPat + ci;
}

export const cuentasController = {
    Registrar,
    login,
    obtenerDocentesYEstudiantes,
    cambiarContrasenia,
    verificarIdYContrasenia,
    obtenerRoles, // Agregado al objeto de exportación
};
