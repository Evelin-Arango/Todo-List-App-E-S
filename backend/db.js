// backend/db.js

// Usamos dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config(); 
const { Pool } = require('pg');

// Crea un Pool de conexión usando la variable de entorno
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Configuración adicional si usas Render y SSL (común y necesario)
    ssl: {
        rejectUnauthorized: false
    }
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL conectado exitosamente.');
    } catch (err) {
        console.error('Fallo la conexión a PostgreSQL:', err.message);
        // Si la conexión falla, es un error fatal, salimos del proceso
        process.exit(1);
    }
};

// Exportamos el pool para poder ejecutar consultas en las rutas (tasks.js)
module.exports = {
    connectDB,
    pool
};