import { Op } from 'sequelize';
import { Reserva } from '../models/index.js';

export const checkDisponibilidad = async (req, res, next) => {
    const { lugarId, fecha, horaInicio, horaFin } = req.body;
    
    if (!lugarId || !fecha || !horaInicio || !horaFin) {
        return res.status(400).json({ 
            message: "Faltan datos obligatorios: lugarId, fecha, horaInicio y horaFin." 
        });
    }

    try {
        /**
         * Buscamos si ya existe una reserva en ese lugar y fecha que se cruce con el horario solicitado.
         * La fórmula lógica es: (Nueva_Inicio < Existente_Fin) Y (Nueva_Fin > Existente_Inicio)
         */
        const reservaExistente = await Reserva.findOne({
            where: {
                lugarId,
                fecha,
                [Op.and]: [
                    {
                        horaInicio: {
                            [Op.lt]: horaFin // El inicio de la existente es antes del fin de la nueva
                        }
                    },
                    {
                        horaFin: {
                            [Op.gt]: horaInicio // El fin de la existente es después del inicio de la nueva
                        }
                    }
                ]
            }
        });

        // 3. Si encontramos una reserva, hay conflicto
        if (reservaExistente) {
            return res.status(409).json({
                error: "CONFLICTO_HORARIO",
                message: "El lugar ya está reservado en ese horario.",
                datosReserva: {
                    inicio: reservaExistente.horaInicio,
                    fin: reservaExistente.horaFin
                }
            });
        }

        // 4. Si llegamos aquí, el lugar está libre. Continuamos al controlador.
        next();

    } catch (error) {
        console.error("Error en middleware de disponibilidad:", error);
        return res.status(500).json({ 
            message: "Error interno al verificar la disponibilidad del lugar." 
        });
    }
};