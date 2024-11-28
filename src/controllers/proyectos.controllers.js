import { proyectosmodel } from '../models/proyectos.model.js';

export const BuscarProyectos = async (req, res) => {
    try {
        const { categoria, titulo } = req.body;
        if (!categoria && !titulo) { // Validación para verificar si al menos uno está presente
            return res.status(400).json({
                message: "Debe completar al menos un campo"
            });
        } else {
            const resultado = await proyectosmodel.BuscarProyecto(categoria, titulo);
            return res.send(resultado);
        }
    } catch (error) {
        console.log("Error al buscar proyectos: ", error); // Corrección de console.log
    }
};

export const proyectoController = {
    BuscarProyectos
};
