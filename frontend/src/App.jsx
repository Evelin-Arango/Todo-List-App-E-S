import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      alert("Error cargando tareas");
    }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask(title);
      setTitle("");
      loadTasks();
    } catch (err) {
      console.error(err);
      alert("Error creando tarea");
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo List</h1>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button>Agregar</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => deleteTask(t.id).then(loadTasks)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
