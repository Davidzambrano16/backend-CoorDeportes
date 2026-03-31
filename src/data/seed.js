import { Usuario, Disciplina } from '../models/index.js';
// Ya no necesitas importar bcrypt aquí si usas individualHooks

const seedDatabase = async () => {
  try {
    await Usuario.sync({ force: true });
    await Disciplina.sync({ force: true });

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
      { nombre: 'Futbol', entrenador: 'prof. omar' },
      { nombre: 'ajedrez', entrenador: 'prof. maria' },
      { nombre: 'basket', entrenador: 'prof. jose' },
      { nombre: 'beisbol', entrenador: 'prof. pablo' }
    ]);

    console.log('✅ Base de datos poblada con éxito');
  } catch (error) {
    console.error('❌ Error en el seeding:', error);
  }
};

export default seedDatabase;