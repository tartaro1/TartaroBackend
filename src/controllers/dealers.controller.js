import { error, success } from "../message/message.js";
import { DealersService } from "../services/dealers.service.js";
import { DealerViewModel } from "../viewmodels/dealer.viewmodel.js";
import { validateDealer, validatePartialUser } from "../schemas/dealer.js";

const dealersService = new DealersService();

/**
 * Controlador para las operaciones relacionadas con los distribuidores
 * @class DealersController
 */
export class DealersController {
  /**
   * Obtiene todos los distribuidores, opcionalmente filtrados por email
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.query - Los parámetros de la consulta
   * @param {string} req.query.email - El email del distribuidor para filtrar
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DealersController
   */
  static async getAll(req, res) {
    try {
      const { email } = req.query;
      const dealers = await dealersService.list({ email });
      res.status(200).json(DealerViewModel.fromModels(dealers));
    } catch (err) {
      error(req, res, 500, "Error processing dealers");
    }
  }

  /**
   * Obtiene un distribuidor por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del distribuidor
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DealersController
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const dealer = await dealersService.getById(id);
      if (!dealer) {
        return error(req, res, 404, "Dealer not found");
      }
      res.json(DealerViewModel.fromModel(dealer));
    } catch (err) {
      error(req, res, 404, "Dealer not found");
    }
  }

  /**
   * Crea un nuevo distribuidor
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.body - El cuerpo de la petición con los datos del distribuidor
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DealersController
   */
  static async create(req, res) {
    const input = validateDealer(req.body);
    if (input.error) {
      return res.status(400).json({ error: input.error.message });
    }
    try {
      const dealer = await dealersService.create(input.data);
      success(req, res, 201, "Dealer created successfully", {
        dealer: DealerViewModel.fromModel(dealer)
      });
    } catch (err) {
      error(req, res, 400, "Error while creating dealer");
    }
  }

  /**
   * Elimina un distribuidor por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del distribuidor
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DealersController
   */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await dealersService.delete(id);
      if (!deleted) return error(req, res, 404, "Dealer not found");
      success(req, res, 200, "Dealer deleted successfully");
    } catch (err) {
      error(req, res, 500, "Error deleting dealer");
    }
  }

  /**
   * Actualiza un distribuidor por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del distribuidor
   * @param {object} req.body - El cuerpo de la petición con los datos actualizados del distribuidor
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DealersController
   */
  static async update(req, res) {
    const { id } = req.params;
    const input = req.body;
    try {
      const parsed = validatePartialUser(input);
      if (parsed.error) {
        return res.status(400).json({ error: parsed.error.message });
      }

      const dealer = await dealersService.update(id, parsed.data);
      if (!dealer) return error(req, res, 404, "Dealer not found");

      success(req, res, 201, "Dealer updated successfully", {
        dealer: DealerViewModel.fromModel(dealer)
      });
    } catch (err) {
      error(req, res, 500, "Error updating dealer");
    }
  }
}
