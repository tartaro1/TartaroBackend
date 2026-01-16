

import { error, success } from "../message/message.js";
import { validateUser } from "../schemas/user.js";
import { UsersService } from "../services/users.service.js";
import { UserViewModel } from "../viewmodels/user.viewmodel.js";
import { AuthViewModel } from "../viewmodels/auth.viewmodel.js";

const usersService = new UsersService();

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
      const users = await usersService.list({ email });
      res.status(200).json(UserViewModel.fromModels(users));
    } catch (errorValue) {
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
      const user = await usersService.getById(id);
      if (!user) {
        return error(req, res, 404, "User not found");
      }
      res.status(200).json(UserViewModel.fromModel(user));
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
      const newUser = await usersService.create(result.data);
      success(req, res, 201, "User created successfully", {
        user: UserViewModel.fromModel(newUser)
      });
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
    try {
      const deleted = await usersService.delete(id);
      if (!deleted) {
        error(req, res, 404, "User deleted not found");
      } else {
        success(req, res, 200, "User deleted successfully");
      }
    } catch (errorValue) {
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
      const updatedUser = await usersService.update(id, input);
      if (!updatedUser) {
        return error(req, res, 404, "User not found");
      }
      success(req, res, 201, "User modified successfully", {
        user: UserViewModel.fromModel(updatedUser)
      });
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
      const response = await usersService.login(input);
      res.json(AuthViewModel.fromLoginResult(response));
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
