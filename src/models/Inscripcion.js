import db from "../database/db.js";

const Inscripcion = db.define('Inscripcion', {
},{
    tableName: 'Inscripciones'
});

export default Inscripcion;