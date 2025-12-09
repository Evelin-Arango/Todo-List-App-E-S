const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo tareas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *",
      [title]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creando tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar el estado de completado
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error actualizando tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error eliminando tarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
