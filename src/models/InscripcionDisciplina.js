import db from "../database/db.js";

const InscripcionDisciplina = db.define('InscripcionDisciplina', {
},{
    tableName: 'InscripcionesDisciplina'
});

export default InscripcionDisciplina;