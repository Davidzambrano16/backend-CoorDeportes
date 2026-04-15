import { Router } from "express";
import { actualizarDisciplina, crearDisciplina, eliminarDisciplina, obtenerDisciplinas } from "../controllers/index.js";
import { esAdmin } from "../middlewares/auth.middleware.js";

const router = Router()

router.get('/', obtenerDisciplinas)
router.get('/:id', obtenerDisciplinas)
router.post('/', esAdmin, crearDisciplina)
router.delete('/:id', esAdmin, eliminarDisciplina)
router.put('/:id', esAdmin, actualizarDisciplina)

export default router  