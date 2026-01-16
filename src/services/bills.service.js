import { FacturasRepository } from "../repositories/facturas.repository.js";
import { models } from "../orm/sequelize.js";

export class BillsService {
  constructor({ facturasRepository } = {}) {
    this.facturasRepository = facturasRepository || new FacturasRepository();
  }

  async getById(id) {
    return this.facturasRepository.findById(id, {
      include: [
        { model: models.Usuario, as: "cliente" },
        { model: models.Pedido, as: "pedido" },
        { model: models.MetodoPago, as: "metodoPago" },
        {
          model: models.DetalleFactura,
          as: "detalles",
          include: [{ model: models.Producto, as: "producto" }]
        }
      ]
    });
  }
}
