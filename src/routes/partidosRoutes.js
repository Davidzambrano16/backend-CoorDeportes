import { Router } from 'express';
import { obtenerPartidos, obtenerPartido, crearPartido, actualizarPartido, eliminarPartido } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';
import { checkDisponibilidad } from '../middlewares/checkDisponibilidad.middleware.js';

const router = Router();

router.get('/', obtenerPartidos);
router.get('/:id', obtenerPartido);
router.post('/:cedula', checkDisponibilidad, crearPartido);
router.put('/:id', actualizarPartido);
router.delete('/:id', eliminarPartido);

export default router;