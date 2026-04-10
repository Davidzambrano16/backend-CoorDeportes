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
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT
    }
})

export default Disciplina