// backend/routes/tasks.js

const express = require('express');
const router = express.Router();
// Importa el pool de conexión para ejecutar consultas
const { pool } = require('../db'); 

// 🚨 Función para crear la tabla si no existe 🚨
// Ejecuta esta lógica una vez al iniciar el servidor (puedes moverla a db.js si prefieres)
(async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                _id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                completed BOOLEAN DEFAULT FALSE
            );
        `;
        await pool.query(createTableQuery);
        console.log('Tabla "tasks" verificada/creada.');
    } catch (err) {
        console.error('Error al crear la tabla:', err.message);
    }
})();


// [GET] Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY _id DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// [POST] Crear una nueva tarea
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "El título es requerido." });
        }

        const result = await pool.query(
            'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
            [title, false]
        );
        res.status(201).json(result.rows[0]); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// [PUT] Actualizar una tarea (título o completado)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        
        // Creamos dinámicamente la consulta de actualización
        let queryParts = [];
        let queryValues = [];
        let paramIndex = 1;

        if (title !== undefined) {
            queryParts.push(`title = $${paramIndex++}`);
            queryValues.push(title);
        }
        if (completed !== undefined) {
            queryParts.push(`completed = $${paramIndex++}`);
            queryValues.push(completed);
        }
        
        // Si no hay nada que actualizar, retornamos 400
        if (queryParts.length === 0) {
             return res.status(400).json({ message: "No hay datos para actualizar." });
        }
        
        // Agregamos el ID al final de los valores para la cláusula WHERE
        queryValues.push(id); 

        const updateQuery = `UPDATE tasks SET ${queryParts.join(', ')} WHERE _id = $${paramIndex} RETURNING *`;
        
        const result = await pool.query(updateQuery, queryValues);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar la tarea: " + err.message });
    }
});

// [DELETE] Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query('DELETE FROM tasks WHERE _id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Tarea no encontrada." });
        }
        res.status(204).send(); // Éxito sin devolver contenido
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;