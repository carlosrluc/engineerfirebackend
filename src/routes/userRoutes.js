import { Router } from "express";
import upload from '../config/multer.js';
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
 *     summary: Crear un nuevo usuario con foto y CV opcionales
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               disponibilidad:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen de perfil (jpeg, png)
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de CV (.pdf o .docx)
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 */

router.post(
  "/usuarios",
  upload.fields([
    { name: 'foto', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
  ]),
  crearUsuario
);

/**
 * @swagger
 * /api/users/usuarios/{dni}:
 *   put:
 *     summary: Actualizar un usuario (incluye foto y CV opcionales)
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
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
 *               disponibilidad:
 *                 type: string
 *               experiencia:
 *                 type: string
 *               comentarios:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Imagen (jpg, png)
 *               cv:
 *                 type: string
 *                 format: binary
 *                 description: Archivo PDF o Word
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

router.put(
  "/usuarios/:dni",
  upload.fields([
    { name: "foto", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  actualizarUsuario
);

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

//para fotos en post
/**se accede a las fotos o cvs asi
http://localhost:3307/uploads/fotos/foto-12345.png
http://localhost:3307/uploads/cvs/cv-67890.pdf
**/


export default router;
