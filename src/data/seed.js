import { Usuario, Disciplina, Torneo, Lugar, Equipo, Reserva, Partido, Alquiler, Fisioterapeuta, CitaFisioterapia } from '../models/index.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    // 1. Limpieza
    await Lugar.sync({ force: true });
    await Usuario.sync({ force: true });
    await Disciplina.sync({ force: true });
    await Torneo.sync({ force: true });
    await Equipo.sync({ force: true });
    await Reserva.sync({ force: true });
    await Partido.sync({ force: true });
    await Alquiler.sync({ force: true });

    const hashedPassword = await bcrypt.hash('123', 10);

    // 2. Lugares
    const lugares = await Lugar.bulkCreate([
      { nombre: 'Cancha de Usos Múltiples - Futbol sala', tipo: 'Cemento' },
      { nombre: 'Cancha de Usos Múltiples - Voleiball ', tipo: 'Cemento' },
      { nombre: 'Cancha de Usos Múltiples - Baloncesto', tipo: 'Cemento' },
      { nombre: 'Cancha de Usos Múltiples - Tenis de Campos', tipo: 'Cemento' },
      { nombre: 'Cancha de Futbol Cesped', tipo: 'Cesped' },
      { nombre: 'Cancha de Futbol arena', tipo: 'Arena' },
      { nombre: 'Cancha de Softball', tipo: 'Cesped' },
      { nombre: 'Laboratorio de rendimiento Fisico', tipo: 'Gimnasio' },
      { nombre: 'Edificio vertical Unet', tipo: 'Salon' },
      { nombre: 'Centro de fisioterapia', tipo: 'Sala' }
    ]);

    // 3. Usuarios (Cédulas reales para capitanes)
    await Usuario.bulkCreate([
      { cedula: 'V-29734989', nombres: 'David', apellidos: 'Zambrano', correo: 'david.zambrano@unet.edu.ve', password: hashedPassword, rol: 'admin', carrera: 'Ing. Informatica' },
      { cedula: 'V-10', nombres: 'Anhela', apellidos: 'Vivas', correo: 'anhela.vivas@unet.edu.ve', password: hashedPassword, rol: 'admin', carrera: 'Arquitectura' },
      { cedula: 'V-11', nombres: 'Andres', apellidos: 'Pérez', correo: 'andres@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Ing. Mecanica' },
      { cedula: 'V-12', nombres: 'María', apellidos: 'García', correo: 'maria@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Ing. Industrial' },
      { cedula: 'V-13', nombres: 'Jose', apellidos: 'Zambrano', correo: 'jose.zambrano@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Ing. Informatica' },
      { cedula: 'V-14', nombres: 'Oscar', apellidos: 'Vivas', correo: 'oscar.vivas@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Arquitectura' },
      { cedula: 'V-15', nombres: 'valentina', apellidos: 'Pérez', correo: 'valentina@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Ing. Mecanica' },
      { cedula: 'V-16', nombres: 'felix', apellidos: 'García', correo: 'felix@unet.edu.ve', password: hashedPassword, rol: 'estudiante', carrera: 'Ing. Industrial' }

    ]);

    // 4. MÁS DISCIPLINAs
    const disciplinas = await Disciplina.bulkCreate([
      {
        nombre: 'SOFTBOL Y BÉISBOL',
        entrenador: ['Prof. Tulio Pineda', 'Prof. Pedro Chavez'],
        telefono: ['0414-706.08.95', '0414-713.57.04'],
        horarios: [{ dias: ['Martes', 'Miércoles'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/beisbol.jpeg',
        lugarId: 7,
        descripcion: 'Práctica conjunta de softbol y béisbol, enfocada en los fundamentos de bateo, fildeo y lanzamiento.'
      },
      {
        nombre: 'FÚTBOL CAMPO',
        entrenador: ['Prof. Argenis Méndez'],
        telefono: ['0424-778.56.33'],
        horarios: [{ dias: ['Martes', 'Viernes'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/futsal.jpeg',
        lugarId: 5, // Cancha de Futbol Cesped
        descripcion: 'Entrenamiento intensivo de fútbol en campo grande. Las sesiones cubren táctica y resistencia física.'
      },
      {
        nombre: 'HALTEROFILIA (Levantamiento de Pesas)',
        entrenador: ['Prof. José Caballero'],
        telefono: ['0414-796.78.39'],
        horarios: [
          { dias: ['Lunes a Viernes'], horaInicio: '10:00 a.m.', horaFin: '12:00 m.' },
          { dias: ['Lunes a Viernes'], horaInicio: '2:30 p.m.', horaFin: '5:30 p.m.' }
        ],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/levantamiento.jpeg',
        lugarId: 8, // Laboratorio de rendimiento Fisico
        descripcion: 'Disciplina olímpica centrada en el levantamiento de cargas máximas.'
      },
      {
        nombre: 'ATLETISMO',
        entrenador: ['Prof. Douglas Urrego'],
        telefono: ['0424-726.61.30', '+57 313.502.11.00'],
        horarios: [{ dias: ['Martes y Viernes'], horaInicio: '8:00 a.m.', horaFin: '9:30 a.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/atletismo.jpeg',
        lugarId: 5, // Se entrena usualmente cerca de las canchas de césped/arena
        descripcion: 'Entrenamiento variado que abarca carreras de velocidad y fondo, saltos y lanzamientos.'
      },
      {
        nombre: 'LABORATORIO DE RENDIMIENTO FÍSICO',
        entrenador: ['Prof. Pablo Velásquez', 'Omar Cárdenas'],
        telefono: ['0424-709.82.28', '0414-075.88.40'],
        horarios: [{ dias: ['Lunes a Viernes'], horaInicio: '8:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/gym.jpeg',
        lugarId: 8, // Laboratorio de rendimiento Fisico
        descripcion: 'Un espacio dedicado a la evaluación científica de la condición física de los atletas.'
      },
      {
        nombre: 'KARATE DO',
        entrenador: ['Prof. Ramón Mantilla'],
        telefono: ['0424-750.72.39'],
        horarios: [{ dias: ['Martes y Jueves'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/karate.jpeg',
        lugarId: 9, // Edificio Vertical UNET
        descripcion: 'Arte marcial tradicional japonés que se enfoca en la autodefensa.'
      },
      {
        nombre: 'FÚTBOL SALA (Masculino/Femenino)',
        entrenador: ['Prof. Ezequiel Osorio'],
        telefono: ['0414-711.95.66'],
        horarios: [{ dias: ['Martes y Jueves'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/futsal.jpeg',
        lugarId: 1, // Cancha de Usos Múltiples - Futbol sala
        descripcion: 'Variante rápida del fútbol jugada en una cancha más pequeña y dura.'
      },
      {
        nombre: 'BALONCESTO (Femenino/Masculino)',
        entrenador: ['Prof. Marianella Giordanelli', 'Prof. Leonel Lara'],
        telefono: ['0414-747.03.60', '0414-705.26.30'],
        horarios: [{ dias: ['Martes y Jueves'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/baloncesto.jpeg',
        lugarId: 3, // Cancha de Usos Múltiples - Baloncesto
        descripcion: 'Deporte de equipo que se juega en una cancha rectangular.'
      },
      {
        nombre: 'KICKINGBALL',
        entrenador: ['Prof. Tulio Pineda'],
        telefono: ['0414-713.57.04'],
        horarios: [{ dias: ['Martes y Viernes'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/kikinball.jpeg',
        lugarId: 7, // Cancha de Softball
        descripcion: 'Deporte competitivo similar al béisbol, pero que se juega pateando un balón.'
      },
      {
        nombre: 'AJEDREZ',
        entrenador: ['Douglas Aliendres (PDTE. Club de Ajedrez)'],
        telefono: ['0424-757.50.77'],
        horarios: [{ dias: ['Martes y Jueves'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/ajedrez.jpeg',
        lugarId: 9, // Edificio Vertical UNET
        descripcion: 'Juego de estrategia sobre un tablero.'
      },
      {
        nombre: 'TENIS DE MESA',
        entrenador: ['Dreys Suarez (PDTE. Club de Tenis de Mesa)'],
        telefono: ['0424-752.63.34'],
        horarios: [{ dias: ['Lunes a Viernes'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/tenismesa.jpeg',
        lugarId: 9, // Edificio Vertical UNET
        descripcion: 'Deporte de raqueta rápido que se juega sobre una mesa dividida por una red.'
      },
      {
        nombre: 'PORRISMO Y FRONTINOSCHEER',
        entrenador: ['Prof. Yulieth Uzcátegui'],
        telefono: ['0424-445.66.96'],
        horarios: [{ dias: ['Miércoles'], horaInicio: '11:00 a.m.', horaFin: '1:00 p.m.' }],
        imagen: 'https://backend-coordeportes-4.onrender.com/uploads/porrismo.jpeg',
        lugarId: 9, // Edificio Vertical UNET
        descripcion: 'Disciplina que combina gimnasia, acrobacia, danza y animación.'
      }
    ]);

    // 5. MÁS TORNEOS (Con estados variados)
    const torneos = await Torneo.bulkCreate([
      { nombre: 'Copa Inter-Facultades 2026', encargado: 'David Zambrano', equipos: 8, fechaInicio: '2026-04-01', maxJugadores: 10, descripcion: 'Torneo central UNET', estado: 'en curso', disciplinaId: disciplinas[0].id },
      { nombre: 'Torneo Relámpago Basket', encargado: 'Omar Cardenas', equipos: 4, fechaInicio: '2026-05-15', maxJugadores: 12, descripcion: 'Inscripciones abiertas', estado: 'proximamente', disciplinaId: disciplinas[1].id },
      { nombre: 'Liga de Voleibol UNET', encargado: 'Anhela Vivas', equipos: 6, fechaInicio: '2026-03-10', maxJugadores: 8, descripcion: 'Finalizando temporada', estado: 'en curso', disciplinaId: disciplinas[2].id }
    ]);

    // 6. MÁS EQUIPOS
    const equipo1 = await Equipo.create({
      nombre: 'Informática FC',
      cantJugadores: 2,
      capitanCedula: 'V-29734989',
      imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=info'
    });
    await equipo1.addUsuarios(['V-29734989', 'V-10']);

    const equipo2 = await Equipo.create({
      nombre: 'Arquitectura Titans',
      cantJugadores: 2,
      capitanCedula: 'V-10',
      imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=arq'
    });
    await equipo2.addUsuarios(['V-11', 'V-12']);

    const equipo3 = await Equipo.create({
      nombre: 'Mecánica Bulls',
      cantJugadores: 2,
      capitanCedula: 'V-11',
      imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=meca'
    });
    await equipo3.addUsuarios(['V-13', 'V-14']);

    const equipo4 = await Equipo.create({
      nombre: 'Unetmes',
      cantJugadores: 2,
      capitanCedula: 'V-11',
      imagen: 'https://api.dicebear.com/7.x/identicon/svg?seed=meca'
    });
    await equipo4.addUsuarios(['V-15', 'V-16']);

    // 7. RESERVAS Y PARTIDOS (Uno finalizado y uno por jugar)
    const res1 = await Reserva.create({ fecha: '2026-04-10', horaInicio: '10:00:00', horaFin: '11:00:00', tipo: 'partido', lugarId: lugares[0].id });
    const res2 = await Reserva.create({ fecha: '2026-04-20', horaInicio: '14:00:00', horaFin: '15:00:00', tipo: 'partido', lugarId: lugares[1].id });

    await Partido.bulkCreate([
      { reservaId: res1.id, torneoId: torneos[0].id, localId: equipo1.id, visitanteId: equipo2.id, puntosLocal: 3, puntosVisitante: 1, finalizado: true },
      { reservaId: res2.id, torneoId: torneos[0].id, localId: equipo3.id, visitanteId: equipo4.id, puntosLocal: 0, puntosVisitante: 0, finalizado: false }
    ]);

    // 8. ALQUILERES
    const resAlquiler = await Reserva.create({ fecha: '2026-04-25', horaInicio: '16:00:00', horaFin: '18:00:00', tipo: 'alquiler', lugarId: lugares[3].id });
    await Alquiler.create({
      reservaId: resAlquiler.id,
      institucion: 'Egresados UNET',
      responsable: 'Pedro Infante',
      contacto: '0414-5556677',
      monto: 45.00,
      pagado: true
    });

    // 9. FISIOTERAPEUTAS (Datos suministrados por la coordinación)
    const fisioterapeutas = await Fisioterapeuta.bulkCreate([
      {
        nombre: 'Sor',
        apellido: 'Rangel',
        especialidad: 'Fisiatría Deportiva',
        disponibilidad: 'Lunes a Viernes (8:30 a.m. - 12:00 m.)',
        contacto: '0414-177.31.29'
      },
      {
        nombre: 'Monsalvi',
        apellido: 'Azorea',
        especialidad: 'Rehabilitación Física',
        disponibilidad: 'Lunes a Viernes (8:30 a.m. - 12:00 m.)',
        contacto: '0414-726.50.19'
      }
    ]);


    await CitaFisioterapia.create({
      fecha: '2026-04-20',
      hora: '09:00:00',
      motivo: 'Evaluación de esguince de tobillo derecho',
      estado: 'pendiente',
      pacienteCedula: 'V-29734989',
      fisioterapeutaId: fisioterapeutas[0].id
    });

    // Cita para Anhela (V-10) con la Ft. Monsalvi
    await CitaFisioterapia.create({
      fecha: '2026-04-21',
      hora: '10:30:00',
      motivo: 'Terapia de recuperación post-entrenamiento',
      estado: 'asistida',
      diagnostico: 'Contractura muscular leve en zona lumbar. Se recomienda reposo de 48h.',
      pacienteCedula: 'V-10',
      fisioterapeutaId: fisioterapeutas[1].id
    });

    console.log('✅ Módulo de Fisioterapia poblado correctamente.');

    console.log('🚀 Base de Datos poblada con éxito. ¡Todo listo para el Front!');
  } catch (error) {
    console.error('❌ Error en el seeding:', error);
  }
};

export default seedDatabase;