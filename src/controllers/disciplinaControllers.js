// src/controllers/disciplinaControllers.js — ACTUALIZADO
// Soporta tanto JSON puro (URL de imagen) como multipart/form-data (archivo local).
// Los campos entrenador, telefono, horarios pueden llegar como strings JSON o arrays.

import { Disciplina } from "../models/index.js";

// Helper: parsear un campo que puede ser string JSON, array, o string plano
const parseArrayField = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        // Si no es JSON, tratar como string separado por comas
        return value.split(',').map(s => s.trim()).filter(Boolean);
    }
};

const parseJsonField = (value, fallback = []) => {
    if (!value) return fallback;
    if (typeof value === 'object') return value;
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
};

export const obtenerDisciplinas = async (req, res, next) => {
    try {
        const disciplinas = await Disciplina.findAll()
        res.status(200).json(disciplinas)
    } catch (error) {
        next(error)
    }
}

export const obtenerDisciplina = async (req, res, next) => {
    try {
        const { id } = req.params
        const disciplina = await Disciplina.findByPk(id)
        if (!disciplina) return res.status(404).json({ message: 'Disciplina no encontrada' });
        res.status(200).json(disciplina)
    } catch (error) {
        next(error)
    }
}

export const crearDisciplina = async (req, res, next) => {
    try {
        const body = req.body;

        // Determinar la URL de imagen:
        // - Si hay archivo subido (multipart), construir URL pública
        // - Si hay campo 'imagen' en el body (URL manual), usarla directamente
        let imagenUrl = body.imagen || null;
        if (req.file) {
            const protocol = req.protocol;
            const host = req.get('host');
            imagenUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        }

        const disciplinaData = {
            nombre: body.nombre,
            descripcion: body.descripcion || '',
            imagen: imagenUrl,
            lugarId: parseInt(body.lugarId, 10),
            entrenador: parseArrayField(body.entrenador),
            telefono: parseArrayField(body.telefono),
            horarios: parseJsonField(body.horarios, []),
        };

        const disciplinaNueva = await Disciplina.create(disciplinaData);
        res.status(201).json(disciplinaNueva)
    } catch (error) {
        console.error('Error al crear disciplina:', error);
        next(error)
    }
}

export const eliminarDisciplina = async (req, res, next) => {
    try {
        const { id } = req.params
        const disciplinaEliminada = await Disciplina.findByPk(id)
        if (!disciplinaEliminada) return res.status(404).json({ message: 'Disciplina no encontrada' });
        await disciplinaEliminada.destroy()
        res.status(200).json({ message: "Disciplina eliminada correctamente" })
    } catch (error) {
        next(error)
    }
}

export const actualizarDisciplina = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const disciplina = await Disciplina.findByPk(id);
        if (!disciplina) {
            return res.status(404).json({ message: "Disciplina no encontrada" });
        }

        // Misma lógica de imagen que en crear
        let imagenUrl = body.imagen !== undefined ? body.imagen : disciplina.imagen;
        if (req.file) {
            const protocol = req.protocol;
            const host = req.get('host');
            imagenUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
        }

        const updateData = {
            nombre: body.nombre || disciplina.nombre,
            descripcion: body.descripcion !== undefined ? body.descripcion : disciplina.descripcion,
            imagen: imagenUrl,
            lugarId: body.lugarId ? parseInt(body.lugarId, 10) : disciplina.lugarId,
            entrenador: body.entrenador !== undefined ? parseArrayField(body.entrenador) : disciplina.entrenador,
            telefono: body.telefono !== undefined ? parseArrayField(body.telefono) : disciplina.telefono,
            horarios: body.horarios !== undefined ? parseJsonField(body.horarios, disciplina.horarios) : disciplina.horarios,
        };

        await disciplina.update(updateData);
        res.status(200).json(disciplina);
    } catch (error) {
        console.error("Error al actualizar disciplina:", error);
        next(error);
    }
};