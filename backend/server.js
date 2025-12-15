require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares obligatorios
app.use(cors());
app.use(express.json());

// Health
app.get('/', (req, res) => res.send('Backend OK'));

// Rutas
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
