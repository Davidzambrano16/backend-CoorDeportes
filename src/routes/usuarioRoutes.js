import { Router } from "express";
import { buscarUsuario, disciplinasInscritas, eliminarInscripcion, inscribirUsuario } from '../controllers/index.js'

const router = Router();

router.get('/:cedula', buscarUsuario)
router.get('/:cedula/inscripcion', disciplinasInscritas)
router.post('/inscripcion', inscribirUsuario);
router.delete('/inscripcion', eliminarInscripcion)

export default router