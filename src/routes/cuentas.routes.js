import { Router } from 'express';
import { solicitudModel } from '../models/cuentas.model.js';

const router = Router();


router.post('/login', async (req, res) => {
    const { usuario, contrasenia } = req.body;

    try {
        const rol = await solicitudModel.verificarCredenciales(usuario, contrasenia);
        
        if (rol) {
            res.status(200).json({ mensaje: 'Login exitoso', rol });
        } else {
            res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        res.status(500).json({ error: 'Error al verificar credenciales' });
    }
});

export default router;
