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

// 🔹 Crear
export const crearUsuario = async (req, res) => {
  try {
    await createUser(req.body);
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Actualizar
export const actualizarUsuario = async (req, res) => {
  try {
    await updateUser(req.params.dni, req.body);
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
