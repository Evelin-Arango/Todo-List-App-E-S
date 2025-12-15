import { useEffect, useState } from "react";
import { getTasks, createTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Cargar tareas
  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  // Crear tarea
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTask(title);
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
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
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
