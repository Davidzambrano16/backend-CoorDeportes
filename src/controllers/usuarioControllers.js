import { enviarEmail } from "../config/mailer.js";
import { Usuario, Disciplina, InscripcionDisciplina } from "../models/index.js"

export const buscarUsuario = async (req, res, next) => {
    try {
        const { cedula } = req.params;
        const usuario = await Usuario.findByPk(cedula);
        res.status(200).json(usuario)
    } catch (error) {
        next(error)
    }
}

export const inscribirUsuario = async (req, res, next) => {
    try {
        const { cedula, disciplinaId } = req.body
        const [usuario, disciplina] = await Promise.all([
            Usuario.findByPk(cedula),
            Disciplina.findByPk(disciplinaId)
        ]);

        if (!usuario) return next({
            status: 404,
            message: 'usuario no encontrado'
        });
        if (!disciplina) return next({
            status: 404,
            message: 'Deporte no encontrado'
        });
        if(usuario.estado == 'inactivo') return next({
            status: 400,
            message: `el usuario ${usuario.nombres} se encuentra inactivo`
        })

        const yaInscrito = await InscripcionDisciplina.findOne({
            where: {
                UsuarioCedula: cedula,
                DisciplinaId: disciplinaId
            }
        })

        if(yaInscrito){
            return next({
                status: 400,
                message: 'Ya te encuentras inscrito en esta disciplina'
            })
        }

        usuario.addDisciplina(disciplina)
        // await enviarEmail(usuario, disciplina);
        
        res.status(200).json({
            message: `Inscripción exitosa en ${disciplina.nombre}`,
            usuario: usuario.nombres,
            cedula: usuario.cedula
        })

    } catch (error) {
        next(error)
    }
}

export const disciplinasInscritas = async(req, res, next) => {
    try {
        const {cedula} = req.params
        const usuario = await Usuario.findByPk(cedula, {
            include: {
                model: Disciplina,
                through: {attributes: []}
            }
        })
        if(!usuario){
            return next({
                status: 400,
                message: 'no tienes ninguna disciplina inscrita'
            })
        }
        res.status(200).json({
            usuario: `${usuario.nombres} ${usuario.apellidos}`,
            carrera: usuario.carrera,
            inscripciones: usuario.Disciplinas 
        });
    } catch (error) {
        next(error)
    }
}

export const eliminarInscripcion = async (req, res, next) =>{
    try {
        const { cedula, disciplinaId } = req.body;

        const usuario = await Usuario.findByPk(cedula);
        const disciplina = await Disciplina.findByPk(disciplinaId);

        if (!usuario || !disciplina) return next({
                status: 404,
                message: 'Datos no encontrados'
            })
            
        await usuario.removeDisciplina(disciplina)
        res.status(200).json({
            message: `Inscripción en ${disciplina.nombre} cancelada.`
        })

    } catch (error) {
        next(error)
    }
}
