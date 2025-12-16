import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* 🔐 CORS CORRECTO PARA LOCAL + VERCEL */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://todo-list-app-e-s-git-main-evelins-projects-fa5df609.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

/* 🧪 RUTA DE PRUEBA */
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente 🚀");
});

/* 📌 RUTAS API */
let tasks = []; // temporal (si luego usas BD se cambia)

/* GET */
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

/* POST */
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  const newTask = {
    _id: Date.now().toString(),
    title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/* PUT */
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  tasks = tasks.map(task =>
    task._id === id
      ? { ...task, title, completed }
      : task
  );

  const updatedTask = tasks.find(t => t._id === id);
  res.json(updatedTask);
});

/* DELETE */
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task._id !== id);
  res.status(204).end();
});

/* 🚀 SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor backend corriendo en puerto", PORT);
});
