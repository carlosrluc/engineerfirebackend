//conecta a maria db
import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

export const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});
//prueba de conexion
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Conexión a MariaDB establecida");
    conn.release();
  } catch (err) {
    console.error("❌ Error en la conexión:", err);
  }
})();