import { Router } from 'express';
import { obtenerTorneos, obtenerTorneo, crearTorneo, actualizarTorneo, eliminarTorneo, inscribirEquipoEnTorneo } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerTorneos);
router.get('/:id', obtenerTorneo);
router.post('/:cedula', crearTorneo);
router.put('/:id', actualizarTorneo);
router.delete('/:id', eliminarTorneo);
router.post('/inscribir-equipo/:cedula', inscribirEquipoEnTorneo);

export default router;