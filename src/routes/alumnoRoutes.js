import { Router } from "express";
import { buscarAlumno, inscribirAlumno } from '../controllers/index.js'

const router = Router();

router.get('/:cedula', buscarAlumno)
router.post('/inscribir', inscribirAlumno);

export default router