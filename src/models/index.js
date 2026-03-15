// src/models/index.js
import Usuario from "./Usuario.js";
import Disciplina from "./Disciplina.js";
import Torneo from "./Torneo.js";
import InscripcionTorneo from "./InscripcionTorneo.js";
import Equipo from "./Equipo.js";
import Partido from "./Partido.js";
import InscripcionDisciplina from "./InscripcionDisciplina.js";

// --- Relaciones existentes ---
Usuario.belongsToMany(Disciplina, { through: InscripcionDisciplina });
Disciplina.belongsToMany(Usuario, { through: InscripcionDisciplina });

Disciplina.hasMany(Torneo, { foreignKey: 'disciplinaId' });
Torneo.belongsTo(Disciplina, { foreignKey: 'disciplinaId' });

Usuario.belongsToMany(Torneo, { through: InscripcionTorneo });
Torneo.belongsToMany(Usuario, { through: InscripcionTorneo });

// --- Relaciones de Equipos y Partidos ---
Torneo.hasMany(Equipo, { foreignKey: 'torneoId' });
Equipo.belongsTo(Torneo, { foreignKey: 'torneoId' });

// Relación Muchos a Muchos: Un equipo tiene varios usuarios (jugadores)
Equipo.belongsToMany(Usuario, { through: 'MiembrosEquipo' });
Usuario.belongsToMany(Equipo, { through: 'MiembrosEquipo' });

Torneo.hasMany(Partido, { foreignKey: 'torneoId' });
Partido.belongsTo(Torneo, { foreignKey: 'torneoId' });

// Relaciones para el encuentro
Partido.belongsTo(Equipo, { as: 'Local', foreignKey: 'localId' });
Partido.belongsTo(Equipo, { as: 'Visitante', foreignKey: 'visitanteId' });

export { Usuario, Disciplina, InscripcionDisciplina, Torneo, InscripcionTorneo, Equipo, Partido };