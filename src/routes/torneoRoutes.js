// src/routes/torneoRoutes.js — ACTUALIZADO
import { Router } from 'express';
import {
    obtenerTorneos, obtenerTorneo, crearTorneo,
    actualizarTorneo, eliminarTorneo, inscribirEquipoEnTorneo
} from '../controllers/index.js';
import { upload } from '../middlewares/Upload.middleware.js';

const router = Router();

router.get('/', obtenerTorneos);
router.get('/:id', obtenerTorneo);
router.post('/:cedula', upload.single('imagen'), crearTorneo);
router.put('/:id', upload.single('imagen'), actualizarTorneo);
router.delete('/:id', eliminarTorneo);
router.post('/inscribir-equipo/:cedula', inscribirEquipoEnTorneo);

export default router;