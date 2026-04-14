import express from 'express';
import { 
    obtenerFisioterapeutas, 
    agendarCita, 
    obtenerCitasUsuario, 
    actualizarCita 
} from '../controllers/index.js';

const router = express.Router();

// Rutas para Especialistas
router.get('/especialistas', obtenerFisioterapeutas);

// Rutas para Citas
router.post('/citas', agendarCita);
router.get('/citas/usuario/:cedula', obtenerCitasUsuario);
router.put('/citas/:id', actualizarCita); // Para cambiar estado a 'asistida' y poner diagnóstico

export default router;