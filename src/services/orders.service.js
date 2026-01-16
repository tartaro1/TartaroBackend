import { Op } from "sequelize";
import { PedidosRepository } from "../repositories/pedidos.repository.js";

export class OrdersService {
  constructor({ pedidosRepository } = {}) {
    this.pedidosRepository = pedidosRepository || new PedidosRepository();
  }

  async list({ dealer, dealerID, user } = {}) {
    if (user) {
      return this.pedidosRepository.findAll({
        where: {
          Cliente: user
        }
      });
    }

    if (dealerID) {
      return this.pedidosRepository.findAll({
        where: {
          ID_Rol: dealerID
        }
      });
    }

    if (dealer) {
      return this.pedidosRepository.findAll({
        where: {
          EstadoPedido: {
            [Op.like]: `%${dealer}%`
          }
        }
      });
    }

    return this.pedidosRepository.findAll();
  }

  async getById(id) {
    return this.pedidosRepository.findById(id);
  }

  async create(input) {
    return this.pedidosRepository.create({
      EstadoPedido: input.EstadoPedido ?? input.estadoPedido ?? null,
      Direccion: input.Direccion ?? input.direccion ?? null,
      Cliente: input.Cliente ?? input.cliente,
      PrecioVenta: input.PrecioVenta ?? input.precioVenta,
      ID_Rol: input.ID_Rol ?? input.idRol,
      FechaPedido: input.FechaPedido ?? new Date()
    });
  }

  async update(id, input) {
    return this.pedidosRepository.updateById(id, input);
  }

  async updateState(id, { EstadoPedido }) {
    return this.pedidosRepository.updateById(id, { EstadoPedido });
  }

  async delete(id) {
    return this.pedidosRepository.deleteById(id);
  }

  async countSales() {
    return this.pedidosRepository.findAll({
      attributes: ["ID_Pedido"]
    });
  }

  async sumSales() {
    const rows = await this.pedidosRepository.findAll({
      attributes: ["PrecioVenta"]
    });

    const total = rows.reduce((acc, r) => acc + Number(r.PrecioVenta || 0), 0);
    return [{ total }];
  }

  async dailySales() {
    return this.pedidosRepository.findAll({
      attributes: ["ID_Pedido", "FechaPedido", "PrecioVenta"]
    });
  }
}
