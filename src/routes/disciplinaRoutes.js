import { Router } from "express";
import { crearDisciplina, eliminarDisciplina, obtenerDisciplinas } from "../controllers/index.js";

const router = Router()

router.get('/', obtenerDisciplinas)
router.get('/:id', obtenerDisciplinas)
router.post('/', crearDisciplina)
router.delete('/', eliminarDisciplina)

export default router  