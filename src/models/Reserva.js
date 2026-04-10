import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Reserva = db.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    horaInicio: { 
        type: DataTypes.TIME, 
        allowNull: false 
    },
    horaFin: { 
        type: DataTypes.TIME, 
        allowNull: false 
    },
    tipo: { 
        type: DataTypes.ENUM('partido', 'alquiler', 'entrenamiento'), 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.STRING 
    }
});

export default Reserva;