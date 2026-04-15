// src/middlewares/upload.middleware.js
// Multer middleware para manejar subida de imágenes desde el frontend móvil.
// Las imágenes se guardan en /uploads en la raíz del proyecto.
// En Render (entorno de producción), el filesystem es efímero, por lo que
// en producción real se debería usar Cloudinary o S3. Para desarrollo/demo funciona.

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegurar que la carpeta uploads exista
const uploadsDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Nombre único: timestamp + nombre original limpio
        const ext = path.extname(file.originalname).toLowerCase();
        const base = path.basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, '_')
            .substring(0, 20);
        const filename = `${Date.now()}_${base}${ext}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpeg, png, webp, gif)'), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB máximo
    }
});

// Helper: obtener la URL pública de una imagen subida
export const getImageUrl = (req, filename) => {
    if (!filename) return null;
    const protocol = req.protocol;
    const host = req.get('host');
    return `${protocol}://${host}/uploads/${filename}`;
};