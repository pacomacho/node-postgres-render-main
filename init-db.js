require("dotenv").config(); // Carga las variables de entorno desde .env
const db = require("./db"); // Importa la conexión a la base de datos

async function initDatabase() {
  try {
    // Crear tabla usuarios si no existe
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        edad INTEGER
      )
    `);

    console.log("Tabla usuarios creada o ya existente");
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}

module.exports = initDatabase;
