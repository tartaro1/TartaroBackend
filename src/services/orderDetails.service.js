import { Op } from "sequelize";
import { models } from "../orm/sequelize.js";
import { DetallePedidoRepository } from "../repositories/detallePedido.repository.js";

export class OrderDetailsService {
  constructor({ detallePedidoRepository } = {}) {
    this.detallePedidoRepository =
      detallePedidoRepository || new DetallePedidoRepository();
  }

  async list({ provider, idProvider } = {}) {
    const include = [
      {
        model: models.Producto,
        as: "producto",
        include: [{ model: models.Proveedor, as: "proveedor" }]
      }
    ];

    if (idProvider) {
      return this.detallePedidoRepository.findAll({
        include,
        where: {
          "$producto.ID_Proveedor$": idProvider
        }
      });
    }

    if (provider) {
      return this.detallePedidoRepository.findAll({
        include,
        where: {
          "$producto.proveedor.Nombre$": {
            [Op.like]: `%${provider}%`
          }
        }
      });
    }

    return this.detallePedidoRepository.findAll({ include });
  }

  async getOrderProducts(orderId) {
    return this.detallePedidoRepository.findAll({
      where: {
        ID_Pedido: orderId
      }
    });
  }

  normalizeCreateInput(input) {
    return {
      ID_Pedido: input.ID_Pedido ?? input.idPedido ?? input.IDPedido,
      ID_Producto: input.ID_Producto ?? input.idProducto ?? input.IDProducto,
      Cantidad: input.Cantidad ?? input.cantidad,
      PrecioVenta: input.PrecioVenta ?? input.precioVenta,
      Descuento: input.Descuento ?? input.descuento ?? 0
    };
  }

  async create(input) {
    const data = this.normalizeCreateInput(input);
    return this.detallePedidoRepository.create(data);
  }

  async update(id, input) {
    return this.detallePedidoRepository.updateById(id, input);
  }

  async delete(id) {
    return this.detallePedidoRepository.deleteById(id);
  }
}
