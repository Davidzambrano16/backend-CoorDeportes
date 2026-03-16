import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Equipo = db.define('Equipo', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    cantJugadores: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    capitanCedula: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

export default Equipo;