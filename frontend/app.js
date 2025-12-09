const API_URL = "http://localhost:5000/api/tasks";

// Cargar tareas cuando inicia la página
document.addEventListener("DOMContentLoaded", loadTasks);

// Agregar tarea
async function addTask() {
    const input = document.getElementById("taskInput");
    const title = input.value.trim();

    if (!title) return;

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });

    const newTask = await res.json();
    input.value = "";

    loadTasks();
}

// Cargar todas las tareas
async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span contenteditable="true" class="task-text">${task.title}</span>
            <button onclick="updateTask(${task.id}, this)">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// Editar tarea
async function updateTask(id, btn) {
    const li = btn.parentElement;
    const newTitle = li.querySelector(".task-text").innerText;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false, title: newTitle }) 
    });

    loadTasks();
}

// Eliminar tarea
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}
