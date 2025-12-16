// frontend/src/api.js

// CLAVE: Usa la variable de entorno (Vercel) o localhost (desarrollo)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

// 1. OBTENER TAREAS
export const getTasks = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('No se pudieron obtener las tareas.');
  }
  return response.json(); 
};

// 2. AGREGAR TAREA
export const addTask = async (title) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Fallo al agregar la tarea: ${errorBody.message}`);
  }
  return response.json();
};

// 3. ACTUALIZAR TAREA 
export const updateTask = async (id, updateData) => {
  if (!id) throw new Error("ID de tarea no proporcionado para la actualización.");
  
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(`Fallo al actualizar la tarea ${id}: ${errorBody.message}`);
  }
  return response.json();
};

// 4. ELIMINAR TAREA
export const deleteTask = async (id) => {
  if (!id) throw new Error("ID de tarea no proporcionado para la eliminación.");

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (response.status === 204) {
      return; 
  }
  if (!response.ok) {
    throw new Error(`Fallo al eliminar la tarea ${id}: ${response.statusText}`);
  }
};