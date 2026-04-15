import { Router } from 'express';
import { obtenerLugares, crearLugar, actualizarLugar } from '../controllers/index.js';

const router = Router();

// Ver todas las canchas (Fútbol, Domo, Tenis, etc.)
router.get('/', obtenerLugares);

// Agregar una cancha nueva al sistema
router.post('/', crearLugar);

router.patch('/:id', actualizarLugar);

export default router;