import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const CitaFisioterapia = db.define('CitasFisioterapia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    motivo: {
        type: DataTypes.TEXT,
        allowNull: false // Ej: "Lesión en tobillo durante torneo"
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'asistida', 'cancelada', 'en_tratamiento'),
        defaultValue: 'pendiente'
    },
    diagnostico: {
        type: DataTypes.TEXT,
        allowNull: true // Lo llena el fisio después de la cita
    }
}, {
    timestamps: true
});

export default CitaFisioterapia;