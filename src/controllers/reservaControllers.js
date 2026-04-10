import { Reserva, Lugar, Partido, Alquiler, Equipo } from '../models/index.js';

export const obtenerCalendarioCompleto = async (req, res) => {
    try {
        // Traemos todas las reservas para mostrarlas en un calendario o lista
        const agenda = await Reserva.findAll({
            include: [
                { model: Lugar }, 
                { 
                    model: Partido, 
                    include: [
                        { model: Equipo, as: 'Local' }, 
                        { model: Equipo, as: 'Visitante' }
                    ] 
                },
                { model: Alquiler }
            ],
            order: [['fecha', 'ASC'], ['horaInicio', 'ASC']]
        });

        res.json(agenda);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la agenda" });
    }
};

export const eliminarReserva = async (req, res) => {
    try {
        const { id } = req.params;
        // Al eliminar la reserva, por la relación (Cascade), 
        // se debería borrar el Alquiler o Partido asociado si así lo configuraste.
        const borrado = await Reserva.destroy({ where: { id } });
        
        if (!borrado) return res.status(404).json({ message: "Reserva no encontrada" });
        
        res.json({ message: "Reserva y registros asociados eliminados" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reserva" });
    }
};