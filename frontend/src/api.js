const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error("❌ VITE_API_URL no está definida");
}

// GET
export const getTasks = async () => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) {
    throw new Error(`Error ${res.status} al obtener tareas`);
  }
  return res.json();
};

// POST
export const addTask = async (title) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, completed: false })
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al crear tarea`);
  }

  return res.json();
};

// PUT
export const updateTask = async (id, data) => {
  if (!id) throw new Error("ID no válido");

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al actualizar tarea`);
  }

  return res.json();
};

// DELETE
export const deleteTask = async (id) => {
  if (!id) throw new Error("ID no válido");

  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Error ${res.status} al eliminar tarea`);
  }
};
