import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const Fisioterapeuta = db.define('Fisioterapeutas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    especialidad: {
        type: DataTypes.STRING,
        defaultValue: 'Fisioterapia General'
    },
    contacto: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true }
    },
    disponibilidad: {
        type: DataTypes.STRING, // Ejemplo: "Lunes a Viernes, 8am - 12pm"
        allowNull: true
    }
}, {
    timestamps: true
});

export default Fisioterapeuta;