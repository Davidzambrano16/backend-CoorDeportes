import {Usuario, Disciplina } from '../models/index.js'
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    // Esto borra la tabla y la vuelve a crear limpia
    await Usuario.sync({ force: true });
    await Disciplina.sync({ force: true });

    const passwordAdmin = await bcrypt.hash('admin123', 10);
    const passwordUser = await bcrypt.hash('user123', 10);

    await Usuario.bulkCreate([
      { cedula: 'V-20123456', nombres: 'Andrés', apellidos: 'Rodríguez', correo: 'andres@unet.edu.ve', carrera: 'Ing. Informática', estado: 'activo', rol: 'estudiante' },
      { cedula: 'V-25987654', nombres: 'María', apellidos: 'Gómez', correo: 'maria@unet.edu.ve', carrera: 'Ing. Industrial', estado: 'activo', rol: 'estudiante' },
      { cedula: 'V-18456123', nombres: 'Pedro', apellidos: 'Pérez', correo: 'pedro@unet.edu.ve', carrera: 'Ing. Civil', estado: 'inactivo', rol: 'estudiante' },
      { cedula: 'V-29734989', nombres: 'David', apellidos: 'Zambrano', correo: 'david.zambrano@unet.edu.ve', carrera: 'Ing. Informatica', estado: 'activo', rol: 'admin' }
    ]);

        await Disciplina.bulkCreate([
            {nombre: 'Futbol', entrenador: 'prof. omar'},
            {nombre: 'ajedrez', entrenador: 'prof. maria'},
            {nombre: 'basket', entrenador: 'prof. jose'},
            {nombre: 'beisbol', entrenador: 'prof. pablo'}
        ])

        console.log('✅ Base de datos poblada con éxito');
    } catch (error) {
        console.error('❌ Error en el seeding:', error);
    }
};

export default seedDatabase;