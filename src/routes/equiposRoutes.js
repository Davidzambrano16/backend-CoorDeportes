import { Router } from 'express';
import { crearEquipo, obtenerEquipos, obtenerEquipo, actualizarEquipo, eliminarEquipo } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerEquipos);
router.get('/:id', obtenerEquipo);
router.post('/:cedula', esAdmin, crearEquipo);
router.put('/:id/:cedula', esAdmin, actualizarEquipo);
router.delete('/:id/:cedula', esAdmin, eliminarEquipo);

export default router;