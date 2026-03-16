import { Partido, Torneo, Equipo } from '../models/index.js';

export const obtenerPartidos = async (req, res, next) => {
  try {
    const partidos = await Partido.findAll({
      include: [
        { model: Torneo },
        { model: Equipo, as: 'Local' },
        { model: Equipo, as: 'Visitante' }
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
        { model: Equipo, as: 'Visitante' }
      ]
    });
    if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
    res.status(200).json(partido);
  } catch (error) {
    next(error);
  }
};

export const crearPartido = async (req, res, next) => {
  try {
    const { fechaHora, lugar, localId, visitanteId, torneoId } = req.body;

    if (!fechaHora || !lugar || !localId || !visitanteId || !torneoId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    if (localId === visitanteId) {
      return res.status(400).json({ message: 'Local y visitante no pueden ser el mismo equipo' });
    }

    const [torneo, local, visitante] = await Promise.all([
      Torneo.findByPk(torneoId),
      Equipo.findByPk(localId),
      Equipo.findByPk(visitanteId)
    ]);

    if (!torneo || !local || !visitante) {
      return res.status(404).json({ message: 'Datos de torneo/equipo no encontrados' });
    }

    const partido = await Partido.create({ fechaHora, lugar, localId, visitanteId, torneoId });
    res.status(201).json(partido);
  } catch (error) {
    next(error);
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
