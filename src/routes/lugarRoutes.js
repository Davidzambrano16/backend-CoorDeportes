import { Router } from 'express';
import { obtenerLugares, crearLugar, actualizarLugar, eliminarLugar } from '../controllers/index.js';

const router = Router();

// Ver todas las canchas (Fútbol, Domo, Tenis, etc.)
router.get('/', obtenerLugares);

// Agregar una cancha nueva al sistema
router.post('/', crearLugar);

router.delete('/:id', eliminarLugar)

router.patch('/:id', actualizarLugar);

export default router;