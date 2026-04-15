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

export const actualizarLugar = async (req, res) => {
    const { id } = req.params;

    try {
        const lugar = await Lugar.findByPk(id);

        if (!lugar) {
            return res.status(404).json({ message: "Lugar no encontrado" });
        }

        await lugar.update(req.body);

        res.json({
            message: "Lugar actualizado correctamente",
            lugar
        });
    } catch (error) {
        console.error("Error al actualizar lugar:", error);
        res.status(500).json({ message: "Error al actualizar el lugar" });
    }
};

export const eliminarLugar = async (req, res) => {
    const { id } = req.params;

    try {
        const lugar = await Lugar.findByPk(id);

        if (!lugar) {
            return res.status(404).json({ message: "Lugar no encontrado" });
        }

        // Opción A: Borrado Lógico (Recomendado para auditoría y estadísticas)
        await lugar.update({ estado: false });

        // Opción B: Borrado Físico (Si realmente quieres borrarlo de la BD, usa lo siguiente:)
        // await lugar.destroy();

        res.json({
            message: "Lugar eliminado correctamente"
        });
    } catch (error) {
        console.error("Error al eliminar lugar:", error);
        res.status(500).json({ message: "Error al eliminar el lugar" });
    }
};