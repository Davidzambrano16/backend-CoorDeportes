import { DataTypes } from "sequelize";
import db from "../database/db.js";

// Lugar.js (Canchas, Domos, Campos)
const Lugar = db.define('lugar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    tableName: 'Lugares'
});

export default Lugar;