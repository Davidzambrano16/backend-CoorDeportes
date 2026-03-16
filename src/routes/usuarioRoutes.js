import { Router } from 'express';
import { buscarUsuario, disciplinasInscritas, eliminarInscripcion, inscribirUsuario, loginUsuario } from '../controllers/index.js';
import { autenticarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', loginUsuario);
router.get('/:cedula', buscarUsuario);
router.get('/inscripcion/:cedula', disciplinasInscritas);
router.post('/inscripcion', inscribirUsuario);
router.delete('/inscripcion', eliminarInscripcion);

export default router;