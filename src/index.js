import express from 'express'
import db from './database/db.js'
import handleError from './middlewares/error.middleware.js'
import {alumnoRoutes, disciplinaRoutes} from './routes/index.js'
import seedDatabase from './data/seed.js';


const app = express();
const PORT =  process.env.PORT || 3000;
app.use(express.json());
app.use('/alumno', alumnoRoutes);
app.use('/disciplina', disciplinaRoutes)
app.use(handleError)

const testConnection = async () => {
    try {
        await db.authenticate();
        console.log('✅ Conexión a la base de datos establecida con éxito.')

        await db.sync({force: false})
        console.log('✅ Tablas sincronizadas.')
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
}
// await seedDatabase();

testConnection();

app.listen(PORT, () => {
    console.log(`servidor corriendo en https://localhost:${PORT}`)
})
