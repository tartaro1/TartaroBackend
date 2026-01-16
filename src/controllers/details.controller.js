import { error, success } from "../message/message.js";
import { OrderDetailsService } from "../services/orderDetails.service.js";
import { OrderDetailViewModel } from "../viewmodels/orderDetail.viewmodel.js";

const orderDetailsService = new OrderDetailsService();

/**
 * Controlador para las operaciones relacionadas con los detalles de los pedidos
 * @class DetailsController
 */
export class DetailsController {
  /**
   * Obtiene todos los detalles de los pedidos, filtrados opcionalmente por proveedor
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.query - Los parámetros de la consulta
   * @param {string} req.query.provider - El nombre del proveedor para filtrar los detalles de los pedidos
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DetailsController
   */
  static async getAll(req, res) {
    try {
      const { provider } = req.query;
      const { idProvider } = req.query;
      const detailsOrders = await orderDetailsService.list({ provider, idProvider });
      res.status(200).json(OrderDetailViewModel.fromModels(detailsOrders));
    } catch (err) {
      error(req, res, 500, "Error processing details order");
    }
  }

  /**
   * Obtiene los productos de un pedido por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DetailsController
   */
  static async getOrderProducts(req, res) {
    try {
      const { id } = req.params;
      const detailsOrder = await orderDetailsService.getOrderProducts(id);
      res.json(OrderDetailViewModel.fromModels(detailsOrder));
    } catch (err) {
      error(req, res, 404, "Couldn't get details");
    }
  }

  /**
   * Crea un nuevo detalle de pedido
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.body - El cuerpo de la petición con los datos del detalle del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DetailsController
   */
  static async create(req, res) {
    try {
      const input = req.body;
      const detail = await orderDetailsService.create(input);
      success(req, res, 201, "Product inserted successfully", {
        detail: OrderDetailViewModel.fromModel(detail)
      });
    } catch (err) {
      error(req, res, 500, "Error creating product")
    }
  }

  /**
   * Elimina un detalle de pedido por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del detalle del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DetailsController
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await orderDetailsService.delete(id);
      if (!deleted) {
        return error(req, res, 404, "Could not delete details");
      }
      success(req, res, 200, "Details deleted successfully");
    } catch (err) {
      error(req, res, 404, "Could not delete details");
    }
  }

  /**
   * Actualiza un detalle de pedido por su ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del detalle del pedido
   * @param {object} req.body - El cuerpo de la petición con los datos actualizados del detalle del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof DetailsController
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const input = req.body;
      const detail = await orderDetailsService.update(id, input);
      if (!detail) {
        return error(req, res, 404, "Error updating details");
      }
      success(req, res, 201, "Successfully updated", {
        detail: OrderDetailViewModel.fromModel(detail)
      });
    } catch (err) {
      error(req, res, 404, "Error updating details");
    }
  }
  static findByProvider = async (req, res) => {
    try {
      const { provider } = req.params;
      const details = await orderDetailsService.list({ provider });
      res.json(OrderDetailViewModel.fromModels(details))
    } catch (err) {
      error(req, res, 401, "Provider not found")
    }
  }
}
