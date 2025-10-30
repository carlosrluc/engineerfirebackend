import {
  getAllUsers,
  getUserByDNI,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

// 🔹 Listar todos
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Buscar por DNI
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await getUserByDNI(req.params.dni);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Crear (editado para que permita la foto)
export const crearUsuario = async (req, res) => {
  try {
    const {
      dni,
      nombres,
      apellidos,
      correo,
      telefono,
      profesion,
      rol,
      disponibilidad,
      experiencia,
      comentarios
    } = req.body;

    const foto = req.files?.foto ? req.files.foto[0].path : null;
    const cv = req.files?.cv ? req.files.cv[0].path : null;

    await pool.query(
      `INSERT INTO usuarios 
        (dni, nombres, apellidos, correo, telefono, profesion, rol, disponibilidad, experiencia, comentarios, foto, cv)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dni, nombres, apellidos, correo, telefono, profesion, rol, disponibilidad, experiencia, comentarios, foto, cv]
    );

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};


// 🔹 Actualizar
export const actualizarUsuario = async (req, res) => {
  try {
    const { dni } = req.params;
    const {
      nombres,
      apellidos,
      correo,
      telefono,
      profesion,
      rol,
      disponibilidad,
      experiencia,
      comentarios,
    } = req.body;

    // Nuevos archivos (si se envían)
    const nuevaFoto = req.files?.foto ? req.files.foto[0].path : null;
    const nuevoCV = req.files?.cv ? req.files.cv[0].path : null;

    // Obtener datos actuales del usuario
    const [usuarioActual] = await pool.query(
      "SELECT * FROM usuarios WHERE dni = ?",
      [dni]
    );

    if (usuarioActual.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Mantener los anteriores si no se envían nuevos
    const fotoFinal = nuevaFoto || usuarioActual[0].foto;
    const cvFinal = nuevoCV || usuarioActual[0].cv;

    // Actualizar usuario
    await pool.query(
      `UPDATE usuarios SET 
        nombres = ?, 
        apellidos = ?, 
        correo = ?, 
        telefono = ?, 
        profesion = ?, 
        rol = ?, 
        disponibilidad = ?, 
        experiencia = ?, 
        comentarios = ?, 
        foto = ?, 
        cv = ?
       WHERE dni = ?`,
      [
        nombres,
        apellidos,
        correo,
        telefono,
        profesion,
        rol,
        disponibilidad,
        experiencia,
        comentarios,
        fotoFinal,
        cvFinal,
        dni,
      ]
    );

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};


// 🔹 Eliminar
export const eliminarUsuario = async (req, res) => {
  try {
    await deleteUser(req.params.dni);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
