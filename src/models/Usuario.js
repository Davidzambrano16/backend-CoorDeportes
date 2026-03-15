import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Usuario = db.define('Usuario', {
    cedula: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo:{
        type: DataTypes.STRING,
        // allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    rol:{
        type: DataTypes.ENUM('estudiante', 'admin')
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    }
},{
    timestamps: true
})

export default Usuario;