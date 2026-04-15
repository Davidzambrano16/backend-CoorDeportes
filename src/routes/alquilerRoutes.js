// routes/alquilerRoutes.js
import { Router } from 'express';
import { registrarAlquiler, obtenerAlquileres, marcarComoPagado } from '../controllers/index.js';
import { checkDisponibilidad } from '../middlewares/checkDisponibilidad.middleware.js';

const router = Router();

router.post('/', checkDisponibilidad, registrarAlquiler);
router.get('/', obtenerAlquileres);
router.patch('/:id', marcarComoPagado);

export default router;