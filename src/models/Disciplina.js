import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Disciplina = db.define('Disciplina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    entrenador: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING,
    },
    horarios: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: []
    },
    lugarId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT
    }
})

export default Disciplina