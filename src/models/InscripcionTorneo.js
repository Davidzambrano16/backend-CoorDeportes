import { DataTypes } from "sequelize";
import db from "../database/db.js";

const InscripcionTorneo = db.define('InscripcionTorneo',{
    },{
        timestamps: false
    })

export default InscripcionTorneo