import { Op } from 'sequelize';
import db from '../database/db.js';
import { Torneo, Disciplina, Equipo, InscripcionTorneo, Usuario } from '../models/index.js';

export const obtenerTorneos = async (req, res, next) => {
    try {
        const torneos = await Torneo.findAll({
            include: [
                { model: Disciplina},  {model: Equipo }
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
            include: [
                { model: Disciplina }
            ]
        });
        if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });
        res.status(200).json(torneo);
    } catch (error) {
        next(error);
    }
};

export const crearTorneo = async (req, res, next) => {
    try {
        const datos = req.body;

        if (!datos.disciplinaId) {
            return res.status(404).json({ message: 'Disciplina no encontrada' });
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
        const torneo = await Torneo.findByPk(id);
        if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });

        if (req.body.disciplinaId) {
            const disciplina = await Disciplina.findByPk(req.body.disciplinaId);
            if (!disciplina) return res.status(404).json({ message: 'Disciplina no encontrada' });
        }

        await torneo.update(req.body);
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
        if (!equipoAInscribir) return res.status(404).json({ error: "Equipo no encontrdo" });

        const torneo = await Torneo.findByPk(torneoId);
        if (!torneo) {
            return res.status(404).json({ error: "El torneo no existe." });
        }

        if (equipoAInscribir.cantJugadores > torneo.maxJugadores) {
            return res.status(400).json({ error: "la cantidad de jugadores de este equipo supera el lim" })
        }

        const yaInscrito = await InscripcionTorneo.findOne({
            where: { EquipoId: equipoId, TorneoId: torneoId }
        });

        if (yaInscrito) {
            return res.status(400).json({ error: "Este equipo ya está participando en este torneo." });
        }

        const cedulasNuevas = equipoAInscribir.Usuarios.map(u => u.cedula);
        console.log(cedulasNuevas)

        const inscripcionesExistentes = await InscripcionTorneo.findAll({
            where: { TorneoId: torneoId },
            attributes: ['EquipoId']
        });
        console.log(inscripcionesExistentes)

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
                    error: `Inscripción rechazada. El jugador con cédula ${jugadorDuplicado.UsuarioCedula} ya está inscrito en este torneo con otro equipo.`
                });
            }
        }
        await torneo.addEquipo(equipoAInscribir);

        res.status(201).json({ message: "Equipo inscrito exitosamente. Todos los jugadores son elegibles." });

    } catch (error) {
        next(error)
    }
};
