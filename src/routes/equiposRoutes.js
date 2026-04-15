import { Router } from 'express';
import { crearEquipo, obtenerEquipos, obtenerEquipo, actualizarEquipo, eliminarEquipo } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerEquipos);
router.get('/:id', obtenerEquipo);
router.post('/:cedula', crearEquipo);
router.put('/:id/:cedula', actualizarEquipo);
router.delete('/:id/:cedula', eliminarEquipo);

export default router;