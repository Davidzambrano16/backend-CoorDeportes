import { Usuario, Disciplina, Torneo, Lugar, Equipo, Reserva, Partido, Alquiler } from '../models/index.js';

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

    // 2. Lugares
    const lugares = await Lugar.bulkCreate([
      { nombre: 'Cancha de Usos Múltiples', tipo: 'Polivalente' },
      { nombre: 'Gimnasio Cubierto', tipo: 'Tabloncillo' },
      { nombre: 'Campo de Béisbol', tipo: 'Tierra' },
      { nombre: 'Cancha de Tenis', tipo: 'Cemento' }
    ]);

    // 3. Usuarios (Cédulas reales para capitanes)
    await Usuario.bulkCreate([
      { cedula: 'V-29734989', nombres: 'David', apellidos: 'Zambrano', correo: 'david.zambrano@unet.edu.ve', password: '123', rol: 'admin', carrera: 'Ing. Informatica' },
      { cedula: 'V-10', nombres: 'Anhela', apellidos: 'Vivas', correo: 'anhela.vivas@unet.edu.ve', password: '123', rol: 'admin', carrera: 'Arquitectura' },
      { cedula: 'V-11', nombres: 'Andres', apellidos: 'Pérez', correo: 'andres@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Ing. Mecanica' },
      { cedula: 'V-12', nombres: 'María', apellidos: 'García', correo: 'maria@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Ing. Industrial' },
      { cedula: 'V-13', nombres: 'Jose', apellidos: 'Zambrano', correo: 'jose.zambrano@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Ing. Informatica' },
      { cedula: 'V-14', nombres: 'Oscar', apellidos: 'Vivas', correo: 'oscar.vivas@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Arquitectura' },
      { cedula: 'V-15', nombres: 'valentina', apellidos: 'Pérez', correo: 'valentina@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Ing. Mecanica' },
      { cedula: 'V-16', nombres: 'felix', apellidos: 'García', correo: 'felix@unet.edu.ve', password: '123', rol: 'estudiante', carrera: 'Ing. Industrial' }

    ]);

    // 4. MÁS DISCIPLINAS
    const disciplinas = await Disciplina.bulkCreate([
      { nombre: 'Fútbol 5', entrenador: 'Prof. Omar', lugarId: lugares[0].id, imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018' },
      { nombre: 'Baloncesto', entrenador: 'Prof. Pedro', lugarId: lugares[1].id, imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc' },
      { nombre: 'Voleibol', entrenador: 'Prof. Maria', lugarId: lugares[1].id, imagen: 'https://images.unsplash.com/photo-1592656670408-3c1f44c526c8' },
      { nombre: 'Béisbol', entrenador: 'Prof. Pablo', lugarId: lugares[2].id, imagen: 'https://images.unsplash.com/photo-1508344953851-48c1774bd00c' }
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
      { reservaId: res1.id, torneoId: torneos[0].id, localId: equipos[0].id, visitanteId: equipos[2].id, puntosLocal: 3, puntosVisitante: 1, finalizado: true },
      { reservaId: res2.id, torneoId: torneos[0].id, localId: equipos[1].id, visitanteId: equipos[3].id, puntosLocal: 0, puntosVisitante: 0, finalizado: false }
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

    console.log('🚀 Base de Datos poblada con éxito. ¡Todo listo para el Front!');
  } catch (error) {
    console.error('❌ Error en el seeding:', error);
  }
};

export default seedDatabase;