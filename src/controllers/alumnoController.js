import { Alumno, Disciplina, Inscripcion } from "../models/index.js"

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
        if(alumno.estado == 'inactivo') return next({
            status: 400,
            message: `el alumno ${alumno.nombres} se encuentra inactivo`
        })

        const yaInscrito = await Inscripcion.findOne({
            where: {
                AlumnoCedula: cedula,
                DisciplinaId: disciplinaId
            }
        })

        if(yaInscrito){
            return next({
                status: 400,
                message: 'Ya te encuentras inscrito en esta disciplina'
            })
        }

        alumno.addDisciplina(disciplina)
        res.status(200).json({
            message: `Inscripción exitosa en ${disciplina.nombre}`,
            alumno: alumno.nombres,
            cedula: alumno.cedula
        })

    } catch (error) {
        next(error)
    }
}

export const disciplinasInscritas = async(req, res, next) => {
    try {
        const {cedula} = req.params
        const alumno = await Alumno.findByPk(cedula, {
            include: {
                model: Disciplina,
                through: {attributes: []}
            }
        })
        if(!alumno){
            return next({
                status: 400,
                message: 'no tienes ninguna disciplina inscrita'
            })
        }
        res.status(200).json({
            alumno: `${alumno.nombres} ${alumno.apellidos}`,
            carrera: alumno.carrera,
            inscripciones: alumno.Disciplinas 
        });
    } catch (error) {
        next(error)
    }
}

export const eliminarInscripcion = async (req, res, next) =>{
    try {
        const { cedula, disciplinaId } = req.body;

        const alumno = await Alumno.findByPk(cedula);
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!alumno || !disciplina) return next({
                status: 404,
                message: 'Datos no encontrados'
            })
            
        await alumno.removeDisciplina(disciplina)
        res.status(200).json({
            message: `Inscripción en ${disciplina.nombre} cancelada.`
        })

    } catch (error) {
        next(error)
    }
}
