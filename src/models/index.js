import Usuario from './Usuario.js';
import Equipo from './Equipo.js';
import Disciplina from './Disciplina.js';
import InscripcionDisciplina from './InscripcionDisciplina.js';
import Torneo from './Torneo.js';
import InscripcionTorneo from './InscripcionTorneo.js';
import Partido from './Partido.js';
import Lugar from './Lugar.js';
import Reserva from './Reserva.js';
import Alquiler from './Alquiler.js';

// 1. Inscripciones
Usuario.belongsToMany(Disciplina, { through: 'InscripcionDisciplina' });
Disciplina.belongsToMany(Usuario, { through: 'InscripcionDisciplina' });

Usuario.belongsToMany(Equipo, { through: 'UsuarioEquipo' });
Equipo.belongsToMany(Usuario, { through: 'UsuarioEquipo' });

Equipo.belongsToMany(Torneo, { through: 'InscripcionTorneo' });
Torneo.belongsToMany(Equipo, { through: 'InscripcionTorneo' });

// 2. Jerarquía de Torneos
Torneo.belongsTo(Disciplina, { foreignKey: 'disciplinaId' });
Disciplina.hasMany(Torneo, { foreignKey: 'disciplinaId' });

Partido.belongsTo(Torneo, { foreignKey: 'torneoId' });
Torneo.hasMany(Partido, { foreignKey: 'torneoId' });

// 3. Equipos en el Partido
Partido.belongsTo(Equipo, { as: 'Local', foreignKey: 'localId' });
Partido.belongsTo(Equipo, { as: 'Visitante', foreignKey: 'visitanteId' });

// 4. GESTIÓN DE DISPONIBILIDAD (Lo que pidió la profa)
Lugar.hasMany(Reserva, { foreignKey: 'lugarId' });
Reserva.belongsTo(Lugar, { foreignKey: 'lugarId' });

// La Reserva es el puente para Partidos y Alquileres
Reserva.hasOne(Partido, { foreignKey: 'reservaId' });
Partido.belongsTo(Reserva, { foreignKey: 'reservaId' });

Reserva.hasOne(Alquiler, { foreignKey: 'reservaId' });
Alquiler.belongsTo(Reserva, { foreignKey: 'reservaId' });

// EXTRA: ¿Dónde entrena la disciplina?
Disciplina.belongsTo(Lugar, { foreignKey: 'lugarId' });
Lugar.hasMany(Disciplina, { foreignKey: 'lugarId' });

export {
    Usuario,
    Equipo,
    Disciplina,
    InscripcionDisciplina,
    Torneo,
    InscripcionTorneo,
    Partido,
    Lugar,
    Reserva,
    Alquiler
};