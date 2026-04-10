import { Reserva, Alquiler, Lugar } from '../models/index.js';
import db from '../database/db.js';

export const registrarAlquiler = async (req, res) => {
    // Iniciamos una transacción para asegurar la integridad de los datos
    const t = await db.transaction();

    try {
        const { 
            lugarId, 
            fecha, 
            horaInicio, 
            horaFin, 
            institucion, 
            responsable, 
            contacto, 
            monto 
        } = req.body;

        const nuevaReserva = await Reserva.create({
            lugarId,
            fecha,
            horaInicio,
            horaFin,
            tipo: 'alquiler',
            descripcion: `Alquiler: ${institucion}`
        }, { transaction: t });

        // 2. Crear el Alquiler vinculado a esa reserva
        const nuevoAlquiler = await Alquiler.create({
            reservaId: nuevaReserva.id,
            institucion,
            responsable,
            contacto,
            monto,
            pagado: false // Por defecto inicia sin pagar
        }, { transaction: t });

        // Confirmamos los cambios en la base de datos
        await t.commit();

        res.status(201).json({
            message: "Alquiler registrado exitosamente",
            data: {
                reserva: nuevaReserva,
                alquiler: nuevoAlquiler
            }
        });

    } catch (error) {
        // Si algo sale mal, revertimos todo
        await t.rollback();
        console.error("Error al registrar alquiler:", error);
        res.status(500).json({ message: "Error al procesar el alquiler" });
    }
};

export const obtenerAlquileres = async (req, res) => {
    try {
        const alquileres = await Alquiler.findAll({
            include: [{
                model: Reserva,
                include: [Lugar] // Para saber en qué cancha es
            }],
            order: [[Reserva, 'fecha', 'DESC']]
        });
        res.json(alquileres);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de alquileres" });
    }
};

export const marcarComoPagado = async (req, res) => {
    try {
        const { id } = req.params;
        const alquiler = await Alquiler.findByPk(id);
        
        if (!alquiler) return res.status(404).json({ message: "Alquiler no encontrado" });

        alquiler.pagado = true;
        await alquiler.save();

        res.json({ message: "Pago registrado correctamente", alquiler });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el pago" });
    }
};