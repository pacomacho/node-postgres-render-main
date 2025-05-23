require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

app.get("/usuarios", async (req, res) => {
  const result = await db.query("SELECT * FROM usuarios");
  res.json(result.rows);
});

// Nuevo endpoint para añadir usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { nombre, email, edad } = req.body;

    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({ error: "Nombre y email son obligatorios" });
    }

    const result = await db.query(
      "INSERT INTO usuarios (nombre, email, edad) VALUES ($1, $2, $3) RETURNING *",
      [nombre, email, edad]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    res.status(500).json({ error: "Error al insertar el usuario" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
