import { DataTypes } from "sequelize";
import db from "../database/db.js";
import bcrypt from "bcrypt";

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
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('estudiante', 'admin'),
        defaultValue: 'estudiante'
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo'),
        defaultValue: 'activo'
    },
    imagen: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.password) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});

export default Usuario;