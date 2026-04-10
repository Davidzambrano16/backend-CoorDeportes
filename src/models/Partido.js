import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Partido = db.define('Partido', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    puntosLocal: { 
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    puntosVisitante: {
        type: DataTypes.INTEGER,
        defaultValue: 0 
    },
    finalizado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
}, { timestamps: false });

export default Partido;