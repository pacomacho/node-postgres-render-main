const { Pool } = require("pg"); // Import the pg library que sirve para conectar a la base de datos

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
