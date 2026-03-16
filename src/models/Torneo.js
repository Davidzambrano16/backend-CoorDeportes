import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Torneo = db.define('Torneo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    encargado:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    equipos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    maxJugadores: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('proximamente', 'en curso', 'finalizado'),
        defaultValue: 'proximamente'
    }
}, { timestamps: false });

export default Torneo;