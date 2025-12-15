import { useState, useEffect } from "react";

const API_URL = "https://todo-list-app-e-s-production.up.railway.app/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Cargar tareas
  const loadTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error cargando tareas", err);
    }
  };

  // Agregar tarea
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    loadTasks();
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Todo List</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
