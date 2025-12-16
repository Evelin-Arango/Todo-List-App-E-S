// backend/server.js

// Carga las variables de entorno al inicio
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const { connectDB } = require('./db'); 

const app = express();
// Usa el puerto de .env o 5000 como fallback
const PORT = process.env.PORT || 5000;

// Middleware para permitir CORS (permite la comunicación frontend <-> backend)
app.use(cors({
    origin: 'http://localhost:5173' // Asume que Vite corre en 5173
}));

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de tareas
app.use('/api/tasks', taskRoutes);

// Ruta especial para ver la BD (como en tu HTML)
app.get('/api/tasks/db/html', (req, res) => {
    res.send('<h1>Vista de la Base de Datos (PostgreSQL Conectada)</h1><p>Las tareas se gestionan mediante la API REST.</p>');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});