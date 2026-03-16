import Usuario from './Usuario.js';
import Equipo from './Equipo.js';
import Disciplina from './Disciplina.js';
import InscripcionDisciplina from './InscripcionDisciplina.js';
import Torneo from './Torneo.js';
import InscripcionTorneo from './InscripcionTorneo.js'
import Partido from './Partido.js';

// 1. Un Usuario puede inscribirse a muchas Disciplinas (y viceversa)
Usuario.belongsToMany(Disciplina, { through: 'InscripcionDisciplina' });
Disciplina.belongsToMany(Usuario, { through: 'InscripcionDisciplina' });

// 2. Un Usuario puede inscribirse a muchos Equipos (y viceversa)
Usuario.belongsToMany(Equipo, { through: 'UsuarioEquipo' });
Equipo.belongsToMany(Usuario, { through: 'UsuarioEquipo' });

// 3. Un Equipo puede inscribirse a muchos Torneos (y viceversa)
Equipo.belongsToMany(Torneo, { through: 'InscripcionTorneo' });
Torneo.belongsToMany(Equipo, { through: 'InscripcionTorneo' });

// 4. Un Torneo pertenece a una Disciplina
Torneo.belongsTo(Disciplina, { foreignKey: 'disciplinaId' });
Disciplina.hasMany(Torneo, { foreignKey: 'disciplinaId' });

// 5. Un Partido pertenece a un Torneo
Partido.belongsTo(Torneo, { foreignKey: 'torneoId' });
Torneo.hasMany(Partido, { foreignKey: 'torneoId' });

/** * EXTRA: Relación de equipos en el partido
 * Para que un partido tenga sentido, necesitamos saber qué equipos juegan.
 */
Partido.belongsTo(Equipo, { as: 'Local', foreignKey: 'localId' });
Partido.belongsTo(Equipo, { as: 'Visitante', foreignKey: 'visitanteId' });

export {
    Usuario,
    Equipo,
    Disciplina,
    InscripcionDisciplina,
    Torneo,
    InscripcionTorneo,
    Partido
};