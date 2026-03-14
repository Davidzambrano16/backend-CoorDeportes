import { Alumno, Disciplina } from "../models/index.js"

export const buscarAlumno = async (req, res, next) => {
    try {
        const { cedula } = req.params;
        const alumno = await Alumno.findByPk(cedula);
        res.status(200).json(alumno)
    } catch (error) {
        next(error)
    }
}

export const inscribirAlumno = async (req, res, next) => {
    try {
        const { cedula, disciplinaId } = req.body
        const [alumno, disciplina] = await Promise.all([
            Alumno.findByPk(cedula),
            Disciplina.findByPk(disciplinaId)
        ]);

        if (!alumno) return next({
            status: 404,
            message: 'Alumno no encontrado'
        });
        if (!disciplina) return next({
            status: 404,
            message: 'Deporte no encontrado'
        });

        alumno.addDisciplina(disciplina)
        res.status(201).json({
            message: `Inscripción exitosa en ${disciplina.nombre}`,
            alumno: alumno.nombres,
            deporte: disciplina.nombre
        })

    } catch (error) {
        next(error)
    }
}
