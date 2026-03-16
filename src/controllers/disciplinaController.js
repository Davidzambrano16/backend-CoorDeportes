import { Disciplina } from "../models/index.js";

export const obtenerDisciplinas = async (req, res, next) => {
    try {
        const disciplinas = await Disciplina.findAll()
        res.status(200).json(disciplinas)
    } catch (error) {
        next(error)
    }
}

export const crearDisciplina = async  (req, res, next) => {
    try {
        const {datos} = req.body
        const disciplinaNueva = await Disciplina.create(datos)
        res.status(201).json(disciplinaNueva)
    } catch (error) {
        next(error)
    }
}

export const eliminarDisciplina = async (req, res, next) => {
    try {
        const {id} = req.params
        const disciplinaEliminada = await Disciplina.findByPk(id)
        disciplinaEliminada.destroy()
        res.status(200).json({
            message: "disciplina eliminada correctamente"
        })
    } catch (error) {
        next(error)
    }
}