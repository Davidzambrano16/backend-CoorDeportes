// src/routes/disciplinaRoutes.js — ACTUALIZADO
// Añade middleware de multer para manejar subida de imágenes en crear y actualizar.

import { Router } from "express";
import {
    actualizarDisciplina,
    crearDisciplina,
    eliminarDisciplina,
    obtenerDisciplina,
    obtenerDisciplinas,
} from "../controllers/index.js";
import { upload } from "../middlewares/Upload.middleware.js";

const router = Router();

router.get('/', obtenerDisciplinas);
router.get('/:id', obtenerDisciplina);

// upload.single('imagen') → acepta un campo llamado 'imagen' como archivo
// Si no viene archivo, req.file será undefined y el controlador usa body.imagen (URL)
router.post('/', upload.single('imagen'), crearDisciplina);
router.put('/:id', upload.single('imagen'), actualizarDisciplina);
router.delete('/:id', eliminarDisciplina);

export default router;