import { Router } from 'express';
import { obtenerCalendarioCompleto, eliminarReserva } from '../controllers/index.js';

const router = Router();

// Obtener la agenda global (Canchas ocupadas por quien sea)
router.get('/', obtenerCalendarioCompleto);

// Cancelar una reserva (Esto liberaría el espacio)
router.delete('/:id', eliminarReserva);

export default router;