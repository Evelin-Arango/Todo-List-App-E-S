// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 1. Cargar Tareas al iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      if (Array.isArray(data)) {
         setTasks(data);
      }
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  // 2. AGREGAR Tarea
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const addedTask = await addTask(newTaskTitle);
      setTasks([...tasks, addedTask]); 
      setNewTaskTitle('');
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      alert("Fallo al agregar la tarea.");
    }
  };

  // 3. ELIMINAR Tarea
  const handleDeleteTask = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id)); 
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("Fallo al eliminar la tarea.");
    }
  };
  
  // 4. Iniciar Modo Edición
  const startEdit = (task) => {
      setEditingId(task._id);
      setEditingTitle(task.title);
  };
  
  // 5. Guardar Edición (Actualizar Título)
  const handleUpdateTask = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      const updatedTask = await updateTask(id, { title: editingTitle }); 
      
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, title: editingTitle } : task
      ));

      setEditingId(null);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert("Fallo al actualizar la tarea.");
    }
  };

  // 6. Manejar el cambio de estado (Completado/Pendiente)
  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { completed: !task.completed });
      
      setTasks(tasks.map(t => 
        t._id === task._id ? updatedTask : t
      ));
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
      alert("Fallo al cambiar el estado de la tarea.");
    }
  };

  return (
    <div className="page">
      <h1>Lista de Tareas</h1>
      {/* Se elimina la referencia a localhost */}

      {/* --- FORMULARIO PARA AGREGAR TAREA --- */}
      <div className="input-box">
        <input 
          id="taskInput" 
          type="text" 
          placeholder="Agregar nueva tarea"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask}>Agregar</button>
        {/* Se elimina el botón "Ver BD" */}
      </div>
      
      {/* --- LISTA DE TAREAS --- */}
      <div className="task-list">
        <ul id="taskList">
          {tasks.map(task => (
            <li key={task._id} className={task.completed ? 'completed' : ''}>
              {editingId === task._id ? (
                // MODO EDICIÓN ACTIVO
                <div className="task-edit-mode">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUpdateTask(task._id)}
                  />
                  <div className="task-actions">
                    <button onClick={() => handleUpdateTask(task._id)} className="save-btn">Guardar</button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">Cancelar</button>
                  </div>
                </div>
              ) : (
                // MODO VISTA NORMAL
                <div className="task-view-mode">
                  <span 
                    onClick={() => handleToggleComplete(task)}
                    className="task-title"
                  >
                    {task.title}
                  </span>
                  <div className="task-actions">
                    <button onClick={() => startEdit(task)} className="edit-btn">Editar</button>
                    <button onClick={() => handleDeleteTask(task._id)} className="delete-btn">Eliminar</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <p className="empty-message">No hay tareas. ¡Añade una nueva!</p>}
      </div>
    </div>
  );
}

export default App;