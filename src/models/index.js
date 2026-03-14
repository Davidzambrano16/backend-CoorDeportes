// src/models/index.js
import Alumno from "./Alumno.js";
import Disciplina from "./Disciplina.js";
import Inscripcion from "./Inscripcion.js"; // Importamos el modelo real

// Usa el OBJETO del modelo en el through, no un string
Alumno.belongsToMany(Disciplina, { through: Inscripcion });
Disciplina.belongsToMany(Alumno, { through: Inscripcion });

export { Alumno, Disciplina, Inscripcion };