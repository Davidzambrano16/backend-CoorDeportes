import { Router } from "express";
import { actualizarDisciplina, crearDisciplina, eliminarDisciplina, obtenerDisciplinas } from "../controllers/index.js";

const router = Router()

router.get('/', obtenerDisciplinas)
router.get('/:id', obtenerDisciplinas)
router.post('/', crearDisciplina)
router.delete('/:id', eliminarDisciplina)
router.put('/:id', actualizarDisciplina)

export default router  