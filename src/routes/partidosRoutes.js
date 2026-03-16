import { Router } from 'express';
import { obtenerPartidos, obtenerPartido, crearPartido, actualizarPartido, eliminarPartido } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerPartidos);
router.get('/:id', obtenerPartido);
router.post('/:cedula', esAdmin, crearPartido);
router.put('/:id', esAdmin, actualizarPartido);
router.delete('/:id', esAdmin, eliminarPartido);

export default router;