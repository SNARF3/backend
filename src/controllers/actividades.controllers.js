import { actividadesModel } from "../models/actividades.model.js";

export const insertarCurso = async (req, res) => {
    try {
        const { id_docente, gestion, paralelo } = req.body;

        if (!id_docente || !gestion || !paralelo) {
            return res.status(400).json({ ok: false, msg: "Faltan parámetros" });
        }

        const nuevoCurso = await actividadesModel.insertarCurso({ id_docente, gestion, paralelo });
        return res.status(201).json({ ok: true, curso: nuevoCurso });
    } catch (error) {
        console.error("Error al insertar curso:", error);
        return res.status(500).json({ ok: false, msg: "Error al insertar curso" });
    }
};

export const obtenerCursos = async (req, res) => {
    try {
        const cursos = await actividadesModel.obtenerCursos();
        return res.status(200).json({ ok: true, cursos });
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener cursos" });
    }
};

export const obtenerUsuariosPorRol = async (req, res) => {
    try {
        const { rol } = req.params;

        if (!rol) {
            return res.status(400).json({ ok: false, msg: "Falta el parámetro rol" });
        }

        const usuarios = await actividadesModel.obtenerUsuariosPorRol(rol);
        return res.status(200).json({ ok: true, usuarios });
    } catch (error) {
        console.error("Error al obtener usuarios por rol:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener usuarios por rol" });
    }
};

export const obtenerUsuariosPorRolxd = async (req, res) => {
    try {
        const { rol } = req.params;

        if (!rol) {
            return res.status(400).json({ ok: false, msg: "Falta el parámetro rol" });
        }

        const usuarios = await actividadesModel.obtenerUsuariosPorRol(rol);
        return res.status(200).json({ ok: true, usuarios });
    } catch (error) {
        console.error("Error al obtener usuarios por rol:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener usuarios por rol" });
    }
};

export const obtenerProgresos = async (req, res) => {
    try {
        const progresos = await actividadesModel.obtenerProgresos();
        return res.status(200).json({ ok: true, progresos });
    } catch (error) {
        console.error("Error al obtener progresos:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener progresos" });
    }
};

export const actualizarRegistro = async (req, res) => {
    try {
        const { tabla, id, campos } = req.body;

        if (!tabla || !id || !campos) {
            return res.status(400).json({ ok: false, msg: "Faltan parámetros" });
        }

        const resultado = await actividadesModel.actualizarRegistro(tabla, id, campos);
        return res.status(200).json({ ok: true, resultado });
    } catch (error) {
        console.error("Error al actualizar registro:", error);
        return res.status(500).json({ ok: false, msg: "Error al actualizar registro" });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id_cuenta } = req.params;

        if (!id_cuenta) {
            return res.status(400).json({ ok: false, msg: "Falta el parámetro id_cuenta" });
        }

        const usuario = await actividadesModel.obtenerUsuarioPorId(id_cuenta);

        if (!usuario) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        return res.status(200).json({ ok: true, usuario });
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener usuario por ID" });
    }
};

export const eliminarCurso = async (req, res) => {
    try {
        const { id_curso } = req.params;

        if (!id_curso) {
            return res.status(400).json({ ok: false, msg: "Falta el parámetro id_curso" });
        }

        const cursoEliminado = await actividadesModel.eliminarCurso(id_curso);

        if (!cursoEliminado) {
            return res.status(404).json({ ok: false, msg: "Curso no encontrado" });
        }

        return res.status(200).json({ ok: true, msg: "Curso eliminado exitosamente", curso: cursoEliminado });
    } catch (error) {
        console.error("Error al eliminar curso:", error);
        return res.status(500).json({ ok: false, msg: "Error al eliminar curso" });
    }
};

export const obtenerEstudiantesConDetalles = async (req, res) => {
    try {
        const estudiantes = await actividadesModel.obtenerEstudiantesConDetalles();

        const headersEstudiantes = [
            { text: 'Nombre', value: 'nombre' },
            { text: 'Apellido Paterno', value: 'apellido_paterno' },
            { text: 'Apellido Materno', value: 'apellido_materno' },
            { text: 'ID Progreso', value: 'id_progreso' },
            { text: 'Curso', value: 'curso' },
            { text: 'Tutor', value: 'tutor' },
            { text: 'Panelista', value: 'panelista' },
        ];

        return res.status(200).json({ ok: true, headersEstudiantes, estudiantes });
    } catch (error) {
        console.error("Error al obtener estudiantes con detalles:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener estudiantes con detalles" });
    }
};

// Exportar todas las funciones como un objeto
export const actividadesController = {
    insertarCurso,
    obtenerCursos,
    obtenerUsuariosPorRol,
    obtenerUsuariosPorRolxd,
    obtenerProgresos,
    actualizarRegistro,
    obtenerUsuarioPorId,
    eliminarCurso,
    obtenerEstudiantesConDetalles,
};