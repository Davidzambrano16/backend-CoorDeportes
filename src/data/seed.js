import { Usuario, Disciplina, Torneo, Lugar, Equipo, Reserva, Partido, Alquiler } from '../models/index.js';

const seedDatabase = async () => {
  try {
    // 1. Sincronizar tablas en orden (force: true limpia todo)
    // Es mejor sincronizar todo el objeto sequelize si es posible, 
    // pero si lo haces manual, respeta el orden de dependencias.
    await Lugar.sync({ force: true });
    await Usuario.sync({ force: true });
    await Disciplina.sync({ force: true });
    await Torneo.sync({ force: true });
    await Equipo.sync({ force: true });
    await Reserva.sync({ force: true });
    await Partido.sync({ force: true });
    await Alquiler.sync({ force: true });

    // 2. Crear Lugares primero (Necesarios para Disciplina y Reservas)
    const lugares = await Lugar.bulkCreate([
      { nombre: 'Cancha de Usos Múltiples', tipo: 'Polivalente' },
      { nombre: 'Coordinación de Deportes', tipo: 'Oficina/Salón' },
      { nombre: 'Campo de Béisbol', tipo: 'Tierra' },
      { nombre: 'Gimnasio Cubierto', tipo: 'Tabloncillo' }
    ]);

    // Mapeo manual para facilitar el uso de IDs abajo
    const [canchaMultiple, coordinacion, campoBeisbol] = lugares;

    // 3. Crear Usuarios
    await Usuario.bulkCreate([
      {
        cedula: 'V-29734989',
        nombres: 'David',
        apellidos: 'Zambrano',
        correo: 'david.zambrano@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Informatica',
        estado: 'activo',
        rol: 'admin'
      },
            {
        cedula: 'V-31714219',
        nombres: 'Anhela',
        apellidos: 'Vivas',
        correo: 'anhela.vivas@unet.edu.ve',
        password: '12345',
        carrera: 'Arquitectura',
        estado: 'activo',
        rol: 'admin'
      },
      {
        cedula: 'V-20123456',
        nombres: 'Andrés',
        apellidos: 'Rodríguez',
        correo: 'andres.rodriguez@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Informatica',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-25987654',
        nombres: 'María',
        apellidos: 'Gómez',
        correo: 'maria.gomez@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Industrial',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-21456789',
        nombres: 'Carlos',
        apellidos: 'Sánchez',
        correo: 'carlos.sanchez@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Mecanica',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-23567812',
        nombres: 'Elena',
        apellidos: 'Moreno',
        correo: 'elena.moreno@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Civil',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-19876543',
        nombres: 'Ricardo',
        apellidos: 'Díaz',
        correo: 'ricardo.diaz@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Electronica',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-27345678',
        nombres: 'Laura',
        apellidos: 'Torres',
        correo: 'laura.torres@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Informatica',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-26123456',
        nombres: 'José',
        apellidos: 'Ramírez',
        correo: 'jose.ramirez@unet.edu.ve',
        password: '12345',
        carrera: 'Ing. Ambiental',
        estado: 'inactivo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-24789012',
        nombres: 'Ana',
        apellidos: 'Martínez',
        correo: 'ana.martinez@unet.edu.ve',
        password: '12345',
        carrera: 'Arquitectura',
        estado: 'activo',
        rol: 'estudiante'
      },
      {
        cedula: 'V-22987123',
        nombres: 'Luis',
        apellidos: 'Castro',
        correo: 'luis.castro@unet.edu.ve',
        password: '12345',
        carrera: 'Lic. Musica',
        estado: 'activo',
        rol: 'estudiante'
      }
    ], {
      individualHooks: true
    });

    // 4. Crear Disciplinas (Usando lugarId en vez de lugarEntrenamiento)
    await Disciplina.bulkCreate([
      {
        nombre: 'Fútbol 5',
        entrenador: 'Prof. Omar',
        lugarId: canchaMultiple.id, // ID real de la tabla Lugar
        imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000'
      },
      {
        nombre: 'Ajedrez',
        entrenador: 'Prof. María',
        lugarId: coordinacion.id,
        imagen: 'https://thezugzwangblog.com/wp-content/uploads/2021/05/primer-torneo-de-ajedrez.jpg'
      },
      {
        nombre: 'Beisbol',
        entrenador: 'Prof. Pablo',
        lugarId: campoBeisbol.id,
        imagen: 'https://7dias.com.do/wp-content/uploads/2025/05/Accion-del-Torneo-de-Beisbol-AA-del-Distrito.jpeg'
      }
    ]);

    // 5. Crear Torneo
    await Torneo.bulkCreate([
      {
        nombre: 'UNET CHAMPIONSHIP 2024',
        encargado: 'Omar Cardenas',
        equipos: 8,
        fechaInicio: '2026-06-26',
        maxJugadores: 12,
        descripcion: 'Witness the most intense basketball matches of the season.',
        imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000',
        disciplinaId: 1
      }
    ]);

    console.log('✅ Base de datos poblada con éxito y relaciones establecidas');
  } catch (error) {
    console.error('❌ Error en el seeding:', error);
  }
};

export default seedDatabase;