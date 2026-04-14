import { Fisioterapeuta, CitaFisioterapia} from '../models/index.js';

export const obtenerFisioterapeutas = async (req, res, next) => {
    try {
        const especialistas = await Fisioterapeuta.findAll();
        res.json(especialistas);
    } catch (error) {
        next(error);
    }
};

export const agendarCita = async (req, res, next) => {
    const { fecha, hora, motivo, pacienteCedula, fisioterapeutaId } = req.body;

    try {
        // 1. Verificar si el usuario ya tiene una cita ese mismo día
        const citaExistente = await CitaFisioterapia.findOne({
            where: { fecha, pacienteCedula }
        });

        if (citaExistente) {
            return res.status(400).json({ 
                error: "Ya tienes una cita agendada para esta fecha." 
            });
        }

        const nuevaCita = await CitaFisioterapia.create({
            fecha,
            hora,
            motivo,
            pacienteCedula,
            fisioterapeutaId
        });

        res.status(201).json({ message: "Cita agendada con éxito", cita: nuevaCita });
    } catch (error) {
        next(error);
    }
};

export const obtenerCitasUsuario = async (req, res, next) => {
    const { cedula } = req.params;
    try {
        const citas = await CitaFisioterapia.findAll({
            where: { pacienteCedula: cedula },
            include: [{ model: Fisioterapeuta, attributes: ['nombre', 'apellido', 'especialidad'] }],
            order: [['fecha', 'DESC']]
        });
        res.json(citas);
    } catch (error) {
        next(error);
    }
};

// Para que el fisio actualice el diagnóstico o el estado
export const actualizarCita = async (req, res, next) => {
    const { id } = req.params;
    const { estado, diagnostico } = req.body;

    try {
        const cita = await CitaFisioterapia.findByPk(id);
        if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

        await cita.update({ estado, diagnostico });
        res.json({ message: "Cita actualizada", cita });
    } catch (error) {
        next(error);
    }
};