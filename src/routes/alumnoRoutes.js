import { Router } from "express";
import { buscarAlumno, disciplinasInscritas, eliminarInscripcion, inscribirAlumno } from '../controllers/index.js'

const router = Router();

router.get('/:cedula', buscarAlumno)
router.get('/:cedula/inscripcion', disciplinasInscritas)
router.post('/inscripcion', inscribirAlumno);
router.delete('/inscripcion', eliminarInscripcion)

export default router