import { error, success } from "../message/message.js";
import { OrdersService } from "../services/orders.service.js";
import { OrderViewModel } from "../viewmodels/order.viewmodel.js";

const ordersService = new OrdersService();

/**
 * Controlador para las operaciones relacionadas con los pedidos
 * @class OrdersController
 */
export class OrdersController {
  /**
   * Sirve para listar pedidos según el nombre del distribuidor, el usuario o el ID del distribuidor, o para mostrarlos todos
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.query - Los parámetros de la consulta
   * @param {string} [req.query.dealer] - El nombre del distribuidor para filtrar los pedidos
   * @param {string} [req.query.dealerID] - El ID del distribuidor para filtrar los pedidos
   * @param {string} [req.query.user] - El usuario para filtrar los pedidos
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async getAll(req, res) {
    const { dealer, dealerID, user } = req.query;
    try {
      const orders = await ordersService.list({ dealer, dealerID, user });
      res.status(200).json(OrderViewModel.fromModels(orders));
    } catch (errorValue) {
      error(req, res, 500, "Error getting orders");
    }
  }

  /**
   * Obtiene un pedido por ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const order = await ordersService.getById(id);
      if (!order) {
        return error(req, res, 404, "Order not found");
      }
      res.json(OrderViewModel.fromModel(order));
    } catch (err) {
      error(req, res, 404, "Order not found");
    }
  }

  /**
   * Crea un nuevo pedido
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.body - El cuerpo de la petición con los datos del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async create(req, res) {
    try {
      const input = req.body;
      const order = await ordersService.create(input);
      success(req, res, 201, "Order created successfully", {
        order: OrderViewModel.fromModel(order)
      });
    } catch (err) {
      error(req, res, 500, "Error creating order")
    }
  }

  /**
   * Actualiza un pedido por ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del pedido
   * @param {object} req.body - El cuerpo de la petición con los datos del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async update(req, res) {
    const { id } = req.params;
    const input = req.body;
    try {
      const updatedOrder = await ordersService.update(id, input);
      if (!updatedOrder) {
        return error(req, res, 404, "Order not found");
      }
      success(req, res, 201, "Order updated successfully", {
        order: OrderViewModel.fromModel(updatedOrder)
      });
    } catch (err) {
      error(req, res, 500, "Error updating order");
    }
  }

  /**
   * Actualiza el estado de un pedido por ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del pedido
   * @param {object} req.body - El cuerpo de la petición con los datos del estado del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async updateState(req, res) {
    const { id } = req.params;
    const input = req.body;
    try {
      const updatedOrder = await ordersService.updateState(id, input);
      if (!updatedOrder) {
        return error(req, res, 404, "Order not found");
      }
      success(req, res, 201, "Order State updated successfully", {
        order: OrderViewModel.fromModel(updatedOrder)
      });
    } catch (err) {
      error(req, res, 500, "Error updating order state");
    }
  }

  /**
   * Elimina un pedido por ID
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.id - El ID del pedido
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await ordersService.delete(id);
      if (!deleted) {
        return error(req, res, 404, "An error occurred while deleting");
      }
      success(req, res, 201, "Order deleted successfully");
    } catch (errorValue) {
      error(req, res, 404, "An error occurred while deleting");
    }
  }

  /**
   * Encuentra pedidos por nombre del distribuidor
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.params - Los parámetros de la ruta
   * @param {string} req.params.dealer - El nombre del distribuidor
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async findByDealer(req, res) {
    error(req, res, 404, "Couldn't find order by dealer");
  }

  /**
   * Cuenta las ventas totales
   * @param {object} req - Captura peticiones HTML
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async countSales(req, res) {
    try {
      const sales = await ordersService.countSales();
      res.json(sales);
    } catch (err) {
      error(req, res, 500, "An error occurred while processing");
    }
  }

  /**
   * Suma las ventas totales
   * @param {object} req - Captura peticiones HTML
   * @param {object} res - Devuelve peticiones HTML
   * @memberof OrdersController
   */
  static async sumSales(req, res) {
    try {
      const sum = await ordersService.sumSales();
      res.json(sum);
    } catch (err) {
      error(req, res, 500, "An error occurred while sum collecting");
    }
  }
  static async dailySales(req, res) {
    try {
      const daily = await ordersService.dailySales();
      res.json(daily);
    } catch (err) {
      error(req, res, 500, "An error occurred while daily collecting");
    }
  }
}
