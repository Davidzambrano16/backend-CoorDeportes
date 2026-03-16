import { Router } from 'express';
import { obtenerTorneos, obtenerTorneo, crearTorneo, actualizarTorneo, eliminarTorneo, inscribirEquipoEnTorneo } from '../controllers/index.js';
import { autenticarToken, esAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerTorneos);
router.get('/:id', obtenerTorneo);
router.post('/:cedula', esAdmin, crearTorneo);
router.put('/:id', esAdmin, actualizarTorneo);
router.delete('/:id', esAdmin, eliminarTorneo);
router.post('/inscribir-equipo/:cedula', esAdmin, inscribirEquipoEnTorneo);

export default router;