import { Usuario, Disciplina, Torneo } from '../models/index.js';
// Ya no necesitas importar bcrypt aquí si usas individualHooks

const seedDatabase = async () => {
  try {
    await Usuario.sync({ force: true });
    await Disciplina.sync({ force: true });
    await Torneo.sync({force: true})

    // Sequelize ahora se encargará de encriptar '123456', '09876', etc.
    await Usuario.bulkCreate([
      { cedula: 'V-20123456', nombres: 'Andrés', apellidos: 'Rodríguez', correo: 'andres@unet.edu.ve', password: '123456', carrera: 'Ing. Informática', estado: 'activo', rol: 'estudiante' },
      { cedula: 'V-25987654', nombres: 'María', apellidos: 'Gómez', correo: 'maria@unet.edu.ve', password: '09876', carrera: 'Ing. Industrial', estado: 'activo', rol: 'estudiante' },
      { cedula: 'V-18456123', nombres: 'Pedro', apellidos: 'Pérez', correo: 'pedro@unet.edu.ve', password: '09876', carrera: 'Ing. Civil', estado: 'inactivo', rol: 'estudiante' },
      { cedula: 'V-29734989', nombres: 'David', apellidos: 'Zambrano', correo: 'david.zambrano@unet.edu.ve', password: '12345', carrera: 'Ing. Informatica', estado: 'activo', rol: 'admin' }
    ], {
      individualHooks: true
    });

    await Disciplina.bulkCreate([
      { nombre: 'Futbol5', entrenador: 'prof. omar', lugar: 'Cancha de uso multiple', imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000' },
      { nombre: 'ajedrez', entrenador: 'prof. maria', lugar: 'coordinacion de deportes', imagen: 'https://thezugzwangblog.com/wp-content/uploads/2021/05/primer-torneo-de-ajedrez.jpg'},
      { nombre: 'volleyball', entrenador: 'david zambrano', lugar: 'Cancha de uso multiple', imagen: 'https://images.unsplash.com/photo-1592656670411-b91993efb20c?q=80&w=500' },
      { nombre: 'basket', entrenador: 'prof. jose', lugar: 'Cancha de uso multiple', imagen: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500' },
      { nombre: 'beisbol', entrenador: 'prof. pablo', lugar: 'cancha de tierra', imagen: 'https://7dias.com.do/wp-content/uploads/2025/05/Accion-del-Torneo-de-Beisbol-AA-del-Distrito.jpeg'}
    ]);

    await Torneo.bulkCreate([
      { nombre: 'UNET CHAMPIONSHIP 2024', encargado:'Omar Cardenas', equipos: 8, fechaInicio: '2026-06-26', maxJugadores: 12, descripcion: 'Witness the most intense basketball matches of the season.', imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop'}
    ])

    console.log('✅ Base de datos poblada con éxito');
  } catch (error) {
    console.error('❌ Error en el seeding:', error);
  }
};

export default seedDatabase;