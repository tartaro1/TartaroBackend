import mysql from "mysql2/promise";
import pool from "../config/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * Modelo para operaciones relacionadas con los usuarios en la base de datos.
 * @class UserModel
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Nombre
 *         - Celular
 *         - Cedula
 *         - Direccion
 *         - Correo
 *         - Contrasena
 *         - ID_Rol
 *         - Estado
 *       properties:
 *         ID_Usuario:
 *           type: integer
 *           description: ID único del usuario
 *         Nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *         Celular:
 *           type: string
 *           description: Número de celular del usuario
 *         Cedula:
 *           type: string
 *           description: Número de cédula del usuario
 *         Direccion:
 *           type: string
 *           description: Dirección del usuario
 *         Correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *         Contrasena:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         ID_Rol:
 *           type: integer
 *           description: ID del rol del usuario
 *         Estado:
 *           type: integer
 *           description: Estado del usuario
 */
export class UserModel {
    /**
     * Obtiene todos los usuarios almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los usuarios.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [users] = await connection.query("CALL SP_LISTAR_USUARIOS();");
            return users[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un usuario por su dirección de correo electrónico.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.email - El correo electrónico del usuario a buscar.
     * @returns {Promise<object|null>} El usuario encontrado o null si no se encuentra.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getByEmail({ email }) {
        const connection = await pool.getConnection();
        try {
            const [user] = await connection.query("CALL SP_USUARIOS_EMAIL(?)", [email]);
            return user[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un usuario por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del usuario a buscar.
     * @returns {Promise<object>} El usuario encontrado.
     * @throws {Error} Si el usuario no se encuentra.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [user] = await connection.query("CALL SP_USUARIO_ID(?)", [id]);
            if (user.length === 0) {
                throw new Error("User not found");
            }
            return user[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {object} params - Parámetros del nuevo usuario.
     * @param {string} params.Nombre - Nombre del nuevo usuario.
     * @param {string} params.Celular - Número de celular del nuevo usuario.
     * @param {string} params.Cedula - Cédula del nuevo usuario.
     * @param {string} params.Direccion - Dirección del nuevo usuario.
     * @param {string} params.Correo - Correo electrónico del nuevo usuario.
     * @param {string} params.Contrasena - Contraseña del nuevo usuario.
     * @param {number} params.ID_Rol - ID del rol del nuevo usuario.
     * @param {number} params.Estado - Estado del nuevo usuario.
     * @returns {Promise<object>} El usuario creado.
     * @throws {Error} Si hay un error durante la creación del usuario.
     */
    /**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
    static async createUser({ input }) {
        const {
            Nombre,
            Celular,
            Cedula,
            Direccion,
            Correo,
            Contrasena,
            ID_Rol,
            Estado
        } = input;
        const passwordUnencrypted = Contrasena;
        const connection = await pool.getConnection();
        try {
            const hash = await bcrypt.hash(passwordUnencrypted, 2);
            const passwordEncrypted = hash;
            const result = await connection.query("CALL RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            const [user] = await connection.query("CALL SP_USUARIO_ID(?)", [result[0].insertId]);
            return user[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un usuario de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del usuario a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación del usuario.
     */
    static async deleteUser({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_EliminarUsuario(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza un usuario en la base de datos por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del usuario a actualizar.
     * @param {object} params.input - Datos actualizados del usuario.
     * @param {string} params.input.Nombre - Nuevo nombre del usuario.
     * @param {string} params.input.Celular - Nuevo número de celular del usuario.
     * @param {string} params.input.Cedula - Nueva cédula del usuario.
     * @param {string} params.input.Direccion - Nueva dirección del usuario.
     * @param {string} params.input.Correo - Nuevo correo electrónico del usuario.
     * @param {string} params.input.Contrasena - Nueva contraseña del usuario (opcional).
     * @param {number} params.input.ID_Rol - Nuevo ID del rol del usuario.
     * @param {number} params.input.Estado - Nuevo estado del usuario.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización del usuario.
     */
    static async updateUser({ id, input }) {
        const {
            Nombre,
            Celular,
            Cedula,
            Direccion,
            Correo,
            Contrasena,
            ID_Rol,
            Estado
        } = input;
        const connection = await pool.getConnection();
        try {
            const [currentPasswordRow] = await connection.query('SELECT Contrasena FROM usuarios WHERE ID_Usuario = ?', [id]);
            const currentPasswordEncrypted = currentPasswordRow[0].Contrasena;
    
            // Verificar si la contraseña ha cambiado
            let passwordEncrypted = currentPasswordEncrypted;
            if (Contrasena !== '') {
                // Generar hash para la nueva contraseña
                const hash = await bcrypt.hash(Contrasena, 2);
                passwordEncrypted = hash;
            }
    
            // Llamar al procedimiento almacenado con los datos actualizados
            const request = await connection.query('CALL SP_MODIFICAR_USUARIO(?,?,?,?,?,?,?,?,?)', [id, Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            return request[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Realiza la autenticación de un usuario por su correo electrónico y contraseña.
     * @param {object} params - Parámetros de autenticación.
     * @param {string} params.input.Correo - Correo electrónico del usuario.
     * @param {string} params.input.Contrasena - Contraseña del usuario.
     * @returns {Promise<object>} Objeto con el token de autenticación y el rol del usuario.
     * @throws {Error} Si el usuario no existe o la contraseña es incorrecta.
     */
    static async login({ input }) {
        const connection = await pool.getConnection();
        const { Correo, Contrasena } = input;
        try {
            const [request] = await connection.query("CALL SP_VERIFICAR_ROLES(?)", [Correo]);
            if (request[0].length === 0) {
                throw new Error("User not found");
            }
            const match = await bcrypt.compare(Contrasena, request[0][0].Contrasena);
            if (!match) {
                throw new Error("Password incorrect");
            }
    
            let payload = {
                Correo: request[0][0].Correo,
                Rol: request[0][0].ID_Rol
            };
    
            let token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
            });
    
            return { token, role: request[0][0].ID_Rol };
        } catch (error) {
            throw new Error(error.message);
        } finally {
            connection.release();
        }
    }
}
