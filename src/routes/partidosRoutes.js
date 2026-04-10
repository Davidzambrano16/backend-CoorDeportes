import { Router } from 'express';
import { obtenerPartidos, obtenerPartido, crearPartido, actualizarPartido, eliminarPartido } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';
import { checkDisponibilidad } from '../middlewares/checkDisponibilidad.middleware.js';

const router = Router();

router.get('/', obtenerPartidos);
router.get('/:id', obtenerPartido);
router.post('/:cedula', esAdmin, checkDisponibilidad, crearPartido);
router.put('/:id', esAdmin, checkDisponibilidad, actualizarPartido);
router.delete('/:id', esAdmin, eliminarPartido);

export default router;