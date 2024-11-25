import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Acceder a la clave secreta desde el archivo .env
const JWT_SECRET = process.env.secretWord;

// Middleware para verificar si el token es válido
export const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Extraer el token del encabezado 'Authorization'

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;  // Guardamos los datos decodificados del usuario en la solicitud
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido.' });
    }
};

// Middleware para verificar el rol del usuario
export const verificarRol = (rolesPermitidos) => (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
        return res.status(403).json({ message: 'Acceso denegado. No tiene los permisos necesarios.' });
    }
    next();
};

// Función para generar el token JWT
export const generarToken = (usuario) => {
    const payload = {
        id_cuenta: usuario.id_cuenta,
        nombres: usuario.nombres,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        nroDocumento: usuario.nroDocumento,
        correo: usuario.correo,
        rol: usuario.rol, 
        usuario: usuario.usuario, 
    };

    // Firmamos el token y lo devolvemos, con una duración de 1 hora
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' });
};

export const decodedToken = async (token) => {
    if (!token) {
        console.log("No mandaron el token xd");
        return null;
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.secretWord, (err, decoded) => {
            if (err) {
                console.log("Token ya vencido o inválido");
                return reject(err);  // Rechazar si hay error
            }

            const datosBasicos = decoded;  // Aquí usamos 'decoded' directamente
            const data = {
                nroDocumento: datosBasicos.nroDocumento,
                nombres: datosBasicos.nombres,
                apellidoPaterno: datosBasicos.apellidoPaterno,
                apellidoMaterno: datosBasicos.apellidoMaterno,
                correo: datosBasicos.correo,
                id_cuenta: datosBasicos.id_cuenta
            };
            resolve(data);
            console.log(data) // Resolver la promesa con los datos decodificados
        });
    });
};