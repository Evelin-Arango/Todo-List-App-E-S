const API_URL = "https://todo-list-app-e-s-production.up.railway.app/api/tasks";

// Cargar tareas
export async function getTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error cargando tareas");
  return res.json();
}

// Crear tarea
export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error("Error creando tarea");
  return res.json();
}

// Actualizar tarea
export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error actualizando tarea");
  return res.json();
}

// Eliminar tarea
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error eliminando tarea");
  return res.json();
}
