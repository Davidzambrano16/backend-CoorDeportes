import { Lugar } from '../models/index.js';

export const obtenerLugares = async (req, res) => {
    try {
        const lugares = await Lugar.findAll({ where: { estado: true } });
        res.json(lugares);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener lugares" });
    }
};

export const crearLugar = async (req, res) => {
    try {
        const nuevoLugar = await Lugar.create(req.body);
        res.status(201).json(nuevoLugar);
    } catch (error) {
        res.status(500).json({ message: "Error al crear lugar" });
    }
};