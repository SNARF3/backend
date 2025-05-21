import { perfilModel } from "../models/perfil.model.js";

export const obtenerPerfil = async (req, res) => {
    try {
        const { id_progreso } = req.params;
        const perfil = await perfilModel.obtenerTodoPerfil({ id_progreso });
        res.status(200).json(perfil);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error al obtener el perfil: " + error });
    }
}

export const perfilController = {
    obtenerPerfil,
}