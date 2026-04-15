import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import handleError from './middlewares/error.middleware.js';
import { 
    usuarioRoutes, disciplinaRoutes, torneoRoutes, 
    equipoRoutes, partidoRoutes, alquilerRoutes, 
    reservaRoutes, lugarRoutes, fisioterapiaRoutes 
} from './routes/index.js';

// Importamos el modelo de Usuario (o el que prefieras) para verificar si hay datos
import Usuario from './models/Usuario.js'; 
import seedDatabase from './data/seed.js';

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares ---
app.use(cors({ origin: '*' }));
app.use(express.json({ strict: false })); // Permite mayor flexibilidad en el JSON
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// --- Rutas ---
app.use('/usuario', usuarioRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/equipo', equipoRoutes);
app.use('/torneo', torneoRoutes);
app.use('/partido', partidoRoutes);
app.use('/alquiler', alquilerRoutes);
app.use('/reserva', reservaRoutes);
app.use('/lugar', lugarRoutes);
app.use('/fisioterapia', fisioterapiaRoutes);

// El middleware de errores SIEMPRE debe ir al final de las rutas
app.use(handleError);

// --- Función de Inicio del Servidor ---
const startServer = async () => {
    try {
        // 1. Conectar a la DB
        await db.authenticate();
        console.log('✅ Conexión a la base de datos establecida con éxito.');

        // 2. Sincronizar tablas
        // 'alter: true' ajusta las columnas sin borrar los datos existentes
        await db.sync({force: true});
        console.log('✅ Tablas sincronizadas correctamente.');

        // 3. Seeder Inteligente
        // Verificamos si ya existen usuarios para no duplicar datos ni causar errores
        const count = await Usuario.count();
        if (count === 0) {
            console.log('⏳ La base de datos está vacía. Iniciando Seeder...');
            // await seedDatabase();
            console.log('🚀 Base de Datos poblada con éxito.');
        } else {
            console.log('ℹ️ La base de datos ya contiene datos. Se saltó el Seeder.');
        }

        // 4. Encender Servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error crítico al iniciar el backend:', error);
        process.exit(1); // Detener el proceso si hay un error grave
    }
};

// Ejecutar el arranque
startServer();