import { useState, useEffect } from "react";

const API_URL = "https://todo-list-app-e-s-production.up.railway.app/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  }

  async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
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
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
