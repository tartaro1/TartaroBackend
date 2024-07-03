

import { error, success } from "../message/message.js";
import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/user.js";

/**
 * Controlador para las operaciones relacionadas con los usuarios
 * @class UsersController
 */
class UsersController {
    /**
     * Sirve para listar usuarios según su email o para mostrarlos todos
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} [req.query.email] - El email para filtrar los usuarios
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async getAll(req, res) {
        try {
            const { email } = req.query;
            if (email) {
                const user = await UserModel.getByEmail({ email });
                res.status(200).json(user);
                // res.render("views.resultUser.ejs", { user });
            } else {
                const users = await UserModel.getAll();
                res.status(200).json(users);
                // res.render("views.users.ejs", { users });
            }
        } catch (error) {
            error(req, res, 500, "Error getting users");
        }
    }

    /**
     * Obtiene un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.getById({ id });
            res.status(200).json(user);
        } catch (err) {
            error(req, res, 404, "User not found");
        }
    }

    /**
     * Crea un nuevo usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async createUser(req, res) {
        const result = validateUser(req.body);
        if (result.error) {
            return res.status(400).json({ error: result.error.errors });
        }
        try {
            const newUser = await UserModel.createUser({ input: result.data });
            success(req, res, 201, "User created successfully");
        } catch (err) {
            error(req, res, 500, "Couldn't create");
        }
    }

    /**
     * Elimina un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async deleteUser(req, res) {
        const { id } = req.params;
        const result = await UserModel.deleteUser({ id });
        try {
            if (result.affectedRows === 0) {
                error(req, res, 404, "User deleted not found");
            } else {
                success(req, res, 200, "User deleted successfully");
            }
        } catch (error) {
            error(req, res, 500, "An error occurred while deleting user");
        }
    }

    /**
     * Actualiza un usuario por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del usuario
     * @param {object} req.body - El cuerpo de la petición con los datos del usuario
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async updateUser(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const updatedUser = await UserModel.updateUser({ id, input });
            success(req, res, 201, "User modified successfully");
        } catch (err) {
            error(req, res, 400, "An error occurred while updating");
        }
    }

    /**
     * Autentica un usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos de login
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async loginUser(req, res) {
        const input = req.body;
        try {
            const response = await UserModel.login({ input });
            res.json(response);
        } catch (err) {
            error(req, res, 400, "email or password incorrect");
        }
    }

    /**
     * Autentica la sesión del usuario
     * @param {object} req - Captura peticiones HTML
     * @param {object} res - Devuelve peticiones HTML
     * @memberof UsersController
     */
    static async authenticate(req, res) {
        success(req, res, 200, "authenticated");
    }
}

export default UsersController;