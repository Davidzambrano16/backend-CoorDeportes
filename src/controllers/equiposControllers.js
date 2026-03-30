import { Op } from 'sequelize';
import db from '../database/db.js';
import { Equipo, Usuario, Torneo } from '../models/index.js';

export const crearEquipo = async (req, res, next) => {
    const { nombre, cantJugadores, capitanCedula, listaCedulas } = req.body;
    const t = await db.transaction();

    const usuario = await Usuario.findByPk(capitanCedula)

    if (!usuario) {
        await t.rollback();
        return res.status(400).json({
            error: `el capitan no existe`
        });
    }

    try {
        const usuariosParaEquipo = await Usuario.findAll({
            where: {
                cedula: { [Op.in]: listaCedulas }
            },
            transaction: t
        });

        if (usuariosParaEquipo.length !== cantJugadores) {
            await t.rollback();
            return res.status(400).json({
                error: `Faltan o supero el lim usuarios por registrar. Se esperaban ${cantJugadores ? cantJugadores : 0} y se encontraron ${usuariosParaEquipo.length}.`
            });
        }

        const nuevoEquipo = await Equipo.create({
            nombre,
            cantJugadores,
            capitanCedula
        }, { transaction: t });

        await nuevoEquipo.addUsuarios(usuariosParaEquipo, { transaction: t });
        await t.commit();

        res.status(201).json({ message: "Equipo creado y jugadores vinculados con éxito", equipo: nuevoEquipo });

    } catch (error) {
        next(error)
    }
};

export const obtenerEquipos = async (req, res, next) => {
    try {
        const equipos = await Equipo.findAll({
            include: [{
                model: Usuario,
                attributes: ['cedula', 'nombres', 'apellidos', 'carrera']
            }]
        });
        res.status(200).json(equipos);
    } catch (error) {
        next(error);
    }
};

export const obtenerEquipo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByPk(id, { include: [{ model: Usuario, as: 'miembros', attributes: ['cedula', 'nombres', 'apellidos'] }, { model: Torneo }] });
        if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.status(200).json(equipo);
    } catch (error) {
        next(error);
    }
};

export const actualizarEquipo = async (req, res, next) => {
    const { id } = req.params;
    const { datos, listaCedulas } = req.body;

    const t = await db.transaction();

    try {
        const equipo = await Equipo.findByPk(id, { transaction: t });

        if (!equipo) {
            await t.rollback();
            return res.status(404).json({ error: "Equipo no encontrado" });
        }

        const usuario = await Usuario.findByPk(datos.capitanCedula)

        if (!usuario) {
            await t.rollback();
            return res.status(400).json({
                error: `el capitan no existe`
            });
        }

        if (listaCedulas) {
            const usuariosEncontrados = await Usuario.findAll({
                where: { cedula: { [Op.in]: listaCedulas } },
                transaction: t
            });

            const cantidadRequerida = datos?.cantJugadores || equipo.cantJugadores;

            if (usuariosEncontrados.length !== cantidadRequerida) {
                await t.rollback();
                return res.status(400).json({
                    error: `La lista de jugadores no coincide con la cantidad requerida (${cantidadRequerida}).`
                });
            }

            await equipo.setUsuarios(usuariosEncontrados, { transaction: t });
        }

        if (datos) {
            await equipo.update(datos, { transaction: t });
        }

        await t.commit();
        res.json({ message: "Equipo actualizado correctamente", equipo });

    } catch (error) {
        if (t) await t.rollback();
        next(error);
    }
};

export const eliminarEquipo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const equipo = await Equipo.findByPk(id);
        if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });

        await equipo.destroy();
        res.status(200).json({ message: 'Equipo eliminado' });
    } catch (error) {
        next(error);
    }
};

export const agregarUsuarioAEquipo = async (req, res, next) => {
    try {
        const { equipoId, cedula } = req.body;
        const equipo = await Equipo.findByPk(equipoId);
        const usuario = await Usuario.findByPk(cedula);

        if (!equipo || !usuario) return res.status(404).json({ message: 'Equipo o usuario no encontrado' });

        if (usuario.equipoId && usuario.equipoId !== equipoId) {
            return res.status(400).json({ message: 'El usuario ya pertenece a otro equipo' });
        }

        if(usuario.estado == 'inactivo'){
            return res.status(400).json({message: 'El usuario se encuentra inactivo'})
        }

        usuario.equipoId = equipoId;
        await usuario.save();

        res.status(200).json({ message: 'Usuario agregado al equipo', usuario });
    } catch (error) {
        next(error);
    }
};
