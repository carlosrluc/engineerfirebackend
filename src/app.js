import express from "express";
import dotenv from "dotenv";
import mariadb from "mariadb";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";
dotenv.config();
const app = express();
app.use(express.json());

// Configuración DB
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Ruta de prueba
app.get("/", (req, res) => res.send("Servidor funcionando 🚀"));

// Probar conexión a DB al iniciar
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conectado a MariaDB");
    conn.release();
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  }
})();

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

// Rutas principales
app.use('/api/users', userRoutes);

// Swagger UI (ruta /api-docs)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta base
app.get("/", (req, res) => res.send("Servidor funcionando"));

import userRoutes from "./routes/userRoutes.js";
app.use("/api", userRoutes);
