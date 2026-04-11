import db from '../database/db.js';
import { Partido, Torneo, Equipo, Reserva } from '../models/index.js';

export const obtenerPartidos = async (req, res, next) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        { model: Torneo },
        { model: Equipo, as: 'Local' },
        { model: Equipo, as: 'Visitante' },
        { model: Reserva }
      ]
    });
    res.status(200).json(partidos);
  } catch (error) {
    next(error);
  }
};

export const obtenerPartido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id, {
      include: [
        { model: Torneo },
        { model: Equipo, as: 'Local' },
        { model: Equipo, as: 'Visitante' },
        { model: Reserva }
      ]
    });
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
    res.status(200).json(partido);
  } catch (error) {
    next(error);
  }
};

export const crearPartido = async (req, res) => {
  const t = await db.transaction();
  try {
    const {
      lugarId, fecha, horaInicio, horaFin, // Datos para la Reserva
      torneoId, localId, visitanteId,      // Datos para el Partido
      descripcion
    } = req.body;

    if (!lugarId || !fecha || !horaInicio || !horaFin || !torneoId || !localId || !visitanteId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // 1. Crear la Reserva
    const nuevaReserva = await Reserva.create({
      lugarId,
      fecha,
      horaInicio,
      horaFin,
      tipo: 'partido',
      descripcion: descripcion || 'Partido de Torneo'
    }, { transaction: t });

    // 2. Crear el Partido vinculado
    const nuevoPartido = await Partido.create({
      reservaId: nuevaReserva.id,
      torneoId,
      localId,
      visitanteId
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: "Partido y Reserva creados", nuevoPartido });

  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Error al crear el partido", error: error.message });
  }
};

export const actualizarPartido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });

    await partido.update(req.body);
    res.status(200).json(partido);
  } catch (error) {
    next(error);
  }
};

export const eliminarPartido = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partido = await Partido.findByPk(id);
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });

    await partido.destroy();
    res.status(200).json({ message: 'Partido eliminado' });
  } catch (error) {
    next(error);
  }
};
