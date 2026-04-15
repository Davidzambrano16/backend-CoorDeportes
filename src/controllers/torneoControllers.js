// src/controllers/torneoControllers.js — ACTUALIZADO
// Soporta imagen como URL manual o archivo subido con multer.

import { Op } from 'sequelize';
import db from '../database/db.js';
import { Torneo, Disciplina, Equipo, InscripcionTorneo, Usuario } from '../models/index.js';

export const obtenerTorneos = async (req, res, next) => {
    try {
        const torneos = await Torneo.findAll({
            include: [
                { model: Disciplina },
                { model: Equipo },
            ]
        });
        res.status(200).json(torneos);
    } catch (error) {
        next(error);
    }
};

export const obtenerTorneo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const torneo = await Torneo.findByPk(id, {
            include: [{ model: Disciplina }]
        });
        if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });
        res.status(200).json(torneo);
    } catch (error) {
        next(error);
    }
};

export const crearTorneo = async (req, res, next) => {
    try {
        const body = req.body;

        let imagenUrl = body.imagen || null;
        if (req.file) {
            imagenUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const datos = {
            nombre: body.nombre,
            encargado: body.encargado,
            fechaInicio: body.fechaInicio,
            equipos: parseInt(body.equipos, 10) || 0,
            maxJugadores: parseInt(body.maxJugadores, 10),
            estado: body.estado || 'proximamente',
            descripcion: body.descripcion || '',
            imagen: imagenUrl,
            disciplinaId: body.disciplinaId ? parseInt(body.disciplinaId, 10) : null,
        };

        if (!datos.disciplinaId) {
            return res.status(400).json({ message: 'La disciplina es obligatoria para crear un torneo.' });
        }

        const torneo = await Torneo.create(datos);
        res.status(201).json(torneo);
    } catch (error) {
        next(error);
    }
};

export const actualizarTorneo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const torneo = await Torneo.findByPk(id);
        if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });

        let imagenUrl = body.imagen !== undefined ? body.imagen : torneo.imagen;
        if (req.file) {
            imagenUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        if (body.disciplinaId) {
            const disciplina = await Disciplina.findByPk(body.disciplinaId);
            if (!disciplina) return res.status(404).json({ message: 'Disciplina no encontrada' });
        }

        const updateData = {
            ...body,
            imagen: imagenUrl,
            equipos: body.equipos ? parseInt(body.equipos, 10) : torneo.equipos,
            maxJugadores: body.maxJugadores ? parseInt(body.maxJugadores, 10) : torneo.maxJugadores,
            disciplinaId: body.disciplinaId ? parseInt(body.disciplinaId, 10) : torneo.disciplinaId,
        };

        await torneo.update(updateData);
        res.status(200).json(torneo);
    } catch (error) {
        next(error);
    }
};

export const eliminarTorneo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const torneo = await Torneo.findByPk(id);
        if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });
        await torneo.destroy();
        res.status(200).json({ message: 'Torneo eliminado' });
    } catch (error) {
        next(error);
    }
};

export const inscribirEquipoEnTorneo = async (req, res, next) => {
    const { equipoId, torneoId } = req.body;

    try {
        const equipoAInscribir = await Equipo.findByPk(equipoId, {
            include: [{ model: Usuario, attributes: ['cedula'] }]
        });
        if (!equipoAInscribir) return res.status(404).json({ error: "Equipo no encontrado" });

        const torneo = await Torneo.findByPk(torneoId);
        if (!torneo) return res.status(404).json({ error: "El torneo no existe." });

        if (equipoAInscribir.cantJugadores > torneo.maxJugadores) {
            return res.status(400).json({ error: "La cantidad de jugadores supera el límite del torneo." });
        }

        const yaInscrito = await InscripcionTorneo.findOne({
            where: { EquipoId: equipoId, TorneoId: torneoId }
        });
        if (yaInscrito) {
            return res.status(400).json({ error: "Este equipo ya está participando en este torneo." });
        }

        const cedulasNuevas = equipoAInscribir.Usuarios.map(u => u.cedula);
        const inscripcionesExistentes = await InscripcionTorneo.findAll({
            where: { TorneoId: torneoId },
            attributes: ['EquipoId']
        });
        const idsEquiposInscritos = inscripcionesExistentes.map(ins => ins.EquipoId);

        if (idsEquiposInscritos.length > 0) {
            const jugadorDuplicado = await db.models.UsuarioEquipo.findOne({
                where: {
                    EquipoId: { [Op.in]: idsEquiposInscritos },
                    UsuarioCedula: { [Op.in]: cedulasNuevas }
                }
            });
            if (jugadorDuplicado) {
                return res.status(400).json({
                    error: `Inscripción rechazada. El jugador ${jugadorDuplicado.UsuarioCedula} ya está inscrito con otro equipo.`
                });
            }
        }

        await torneo.addEquipo(equipoAInscribir);
        res.status(201).json({ message: "Equipo inscrito exitosamente." });
    } catch (error) {
        next(error);
    }
};
