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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
