import  pool  from "../config/db.js";

// 🔹 Obtener todos los usuarios
export async function getAllUsers() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM usuarios");
  conn.release();
  return rows;
}

// 🔹 Obtener usuario por DNI
export async function getUserByDNI(dni) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM usuarios WHERE dni = ?", [dni]);
  conn.release();
  return rows[0];
}

// 🔹 Crear usuario
export async function createUser(data) {
  const conn = await pool.getConnection();
  const sql = `
    INSERT INTO usuarios 
    (dni, nombres, apellidos, correo, telefono, profesion, rol, disponibilidad, certificaciones, experiencia, comentarios, cuenta_bancaria_numero, cuenta_bancaria_banco, foto, cv)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.dni,
    data.nombres,
    data.apellidos,
    data.correo,
    data.telefono,
    data.profesion,
    data.rol,
    data.disponibilidad,
    JSON.stringify(data.certificaciones || []),
    data.experiencia || null,
    data.comentarios || null,
    data.cuenta_bancaria?.numero || null,
    data.cuenta_bancaria?.banco || null,
    data.foto || null,
    data.cv || null,
  ];
  await conn.query(sql, values);
  conn.release();
}

// 🔹 Actualizar usuario
export async function updateUser(dni, data) {
  const conn = await pool.getConnection();
  const sql = `
    UPDATE usuarios SET
      nombres=?, 
      apellidos=?, 
      correo=?, 
      telefono=?, 
      profesion=?, 
      rol=?, 
      disponibilidad=?,
      certificaciones=?, 
      experiencia=?, 
      comentarios=?, 
      cuenta_bancaria_numero=?, 
      cuenta_bancaria_banco=?,
      foto=?,
      cv=?
    WHERE dni=?
  `;
  const values = [
    data.nombres,
    data.apellidos,
    data.correo,
    data.telefono,
    data.profesion,
    data.rol,
    data.disponibilidad,
    JSON.stringify(data.certificaciones || []),
    data.experiencia || null,
    data.comentarios || null,
    data.cuenta_bancaria?.numero || null,
    data.cuenta_bancaria?.banco || null,
    data.foto || null,
    data.cv || null,
    dni,
  ];
  await conn.query(sql, values);
  conn.release();
}

// 🔹 Eliminar usuario
export async function deleteUser(dni) {
  const conn = await pool.getConnection();
  await conn.query("DELETE FROM usuarios WHERE dni = ?", [dni]);
  conn.release();
}
