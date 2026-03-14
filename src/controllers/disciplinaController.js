import { Disciplina } from "../models/index.js";

export const obtenerDisciplinas = async (req, res, next) => {
    try {
        const disciplinas = await Disciplina.findAll()
        res.status(200).json(disciplinas)
    } catch (error) {
        next(error)
    }
}