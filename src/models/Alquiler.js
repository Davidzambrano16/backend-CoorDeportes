import { DataTypes } from "sequelize";
import db from "../database/db.js";

// Alquiler.js
const Alquiler = db.define('Alquiler', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institucion: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    responsable: { 
        type: DataTypes.STRING
    },
    contacto: { 
        type: DataTypes.STRING
    },
    monto: { 
        type: DataTypes.DECIMAL(10, 2), 
        defaultValue: 0.00 
    },
    pagado: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }
}, {
    tableName: 'Alquileres',
});

export default Alquiler