import Alumno from "./alumno.js";
import Disciplina from "./disciplina.js";

Alumno.belongsToMany(Disciplina,{ through: 'Inscripciones' })
Disciplina.belongsToMany(Alumno, { through: 'Inscripciones' })

export { default as Alumno } from './alumno.js';
export { default as Disciplina} from './disciplina.js';