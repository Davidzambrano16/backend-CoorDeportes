import Alumno from "../models/alumno.js";
import Disciplina from "../models/disciplina.js";

const seedDatabase = async () => {
    try {
        // Esto borra la tabla y la vuelve a crear limpia
        await Alumno.sync({ force: true });
        await Disciplina.sync({force: true})

        await Alumno.bulkCreate([
            { cedula: 'V-20123456', nombres: 'Andrés', apellidos: 'Rodríguez', carrera: 'Ing. Informática', estado: 'activo' },
            { cedula: 'V-25987654', nombres: 'María', apellidos: 'Gómez', carrera: 'Ing. Industrial', estado: 'activo' },
            { cedula: 'V-18456123', nombres: 'Pedro', apellidos: 'Pérez', carrera: 'Ing. Civil', estado: 'inactivo' }
        ]);

        await Disciplina.bulkCreate([
            {nombre: 'Futbol'},
            {nombre: 'ajedrez'},
            {nombre: 'basket'},
            {nombre: 'beisbol'}
        ])

        console.log('✅ Base de datos poblada con éxito');
    } catch (error) {
        console.error('❌ Error en el seeding:', error);
    }
};

export default seedDatabase;