import { error, success } from "../message/message.js";
import { ProvidersService } from "../services/providers.service.js";
import { ProviderViewModel } from "../viewmodels/provider.viewmodel.js";

const providersService = new ProvidersService();

/**
 * Controlador para las operaciones relacionadas con los proveedores
 * @class ProviderController
 */
export class ProviderController {
  /**
   * Obtiene todos los proveedores
   * @param {object} req - Objeto de solicitud Express
   * @param {object} res - Objeto de respuesta Express
   * @returns {Promise<void>}
   */
  static getAll = async (req, res) => {
    try {
      const providers = await providersService.list();
      res.json(ProviderViewModel.fromModels(providers))
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Obtiene un proveedor por su ID
   * @param {object} req - Objeto de solicitud Express
   * @param {object} res - Objeto de respuesta Express
   * @returns {Promise<void>}
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const provider = await providersService.getById(id);
      if (!provider) {
        return error(req, res, 404, "provider not found");
      }
      res.status(200).json(ProviderViewModel.fromModel(provider));
    } catch (err) {
      error(req, res, 404, "provider not found");
    }
  }

  /**
   * Crea un nuevo proveedor
   * @param {object} req - Objeto de solicitud Express
   * @param {object} res - Objeto de respuesta Express
   * @returns {Promise<void>}
   */
  static create = async (req, res) => {
    try {
      const input = req.body;
      const provider = await providersService.create(input);
      success(req, res, 200, "OK", { provider: ProviderViewModel.fromModel(provider) })
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Actualiza un proveedor existente
   * @param {object} req - Objeto de solicitud Express
   * @param {object} res - Objeto de respuesta Express
   * @returns {Promise<void>}
   */
  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const input = req.body;
      const provider = await providersService.update(id, input);
      if (!provider) {
        return error(req, res, 404, "provider not found");
      }
      success(req, res, 200, "OK", { provider: ProviderViewModel.fromModel(provider) })
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Elimina un proveedor
   * @param {object} req - Objeto de solicitud Express
   * @param {object} res - Objeto de respuesta Express
   * @returns {Promise<void>}
   */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await providersService.delete(id);
      if (!deleted) {
        error(req, res, 404, "Provider deleted not found");
      } else {
        success(req, res, 200, "Provider deleted successfully");
      }
    } catch (error) {
      error(req, res, 500, "An error occurred while deleting provider");
    }
  }
}
