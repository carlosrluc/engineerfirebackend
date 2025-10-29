import { Router } from "express";
import {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones CRUD para gestión de usuarios
 */

/**
 * @swagger
 * /api/users/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get("/usuarios", listarUsuarios);

/**
 * @swagger
 * /api/users/usuarios/{dni}:
 *   get:
 *     summary: Obtener un usuario por DNI
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/usuarios/:dni", obtenerUsuario);

/**
 * @swagger
 * /api/users/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: integer
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               profesion:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [usuario, administrador de proyectos, gerente]
 *               disponibilidad:
 *                 type: string
 *                 enum: [disponible, no disponible]
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */
router.post("/usuarios", crearUsuario);

/**
 * @swagger
 * /api/users/usuarios/{dni}:
 *   put:
 *     summary: Actualizar un usuario por DNI
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               profesion:
 *                 type: string
 *               rol:
 *                 type: string
 *               disponibilidad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/usuarios/:dni", actualizarUsuario);

/**
 * @swagger
 * /api/users/usuarios/{dni}:
 *   delete:
 *     summary: Eliminar un usuario por DNI
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/usuarios/:dni", eliminarUsuario);

export default router;
