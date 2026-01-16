import { Op, fn, col, literal } from "sequelize";
import { ProductosRepository } from "../repositories/productos.repository.js";
import { models } from "../orm/sequelize.js";

export class ProductsService {
  constructor({ productosRepository } = {}) {
    this.productosRepository = productosRepository || new ProductosRepository();
  }

  async list({ category } = {}) {
    if (!category) {
      return this.productosRepository.findAll();
    }

    return this.productosRepository.findAll({
      include: [
        {
          model: models.Categoria,
          as: "categoria",
          where: {
            Nombre: {
              [Op.like]: `%${category}%`
            }
          },
          required: true
        }
      ]
    });
  }

  async getById(id) {
    return this.productosRepository.findById(id);
  }

  async searchByName(name) {
    return this.productosRepository.findAll({
      where: {
        NombreProducto: {
          [Op.like]: `%${name}%`
        }
      }
    });
  }

  normalizeCreateInput(input) {
    return {
      NombreProducto: input.NombreProducto ?? input.nombre,
      ID_Categoria: input.ID_Categoria ?? input.id_categoria ?? input.idCategoria ?? null,
      Marca: input.Marca ?? input.marca,
      ID_Proveedor: input.ID_Proveedor ?? input.id_proveedor ?? input.idProveedor,
      Descripcion: input.Descripcion ?? input.descripcion,
      PrecioVenta: input.PrecioVenta ?? input.precio ?? input.precioVenta,
      Calificacion: input.Calificacion ?? input.calificacion ?? 0,
      Disponibilidad:
        input.Disponibilidad ?? input.disponibilidad ?? input.stock ?? true,
      imagen: input.imagen ?? null
    };
  }

  async create(input) {
    const data = this.normalizeCreateInput(input);
    return this.productosRepository.create(data);
  }

  async update(id, input) {
    const data = this.normalizeCreateInput(input);
    return this.productosRepository.updateById(id, data);
  }

  async delete(id) {
    return this.productosRepository.deleteById(id);
  }

  async stock() {
    return this.productosRepository.findAll({
      attributes: ["id", "Disponibilidad"]
    });
  }

  async top({ limit = 10 } = {}) {
    return this.productosRepository.findAll({
      order: [["Calificacion", "DESC"]],
      limit
    });
  }

  async mostSales({ limit = 10 } = {}) {
    const rows = await models.DetallePedido.findAll({
      attributes: [
        "ID_Producto",
        [fn("COUNT", col("ID_Producto")), "ventas"]
      ],
      group: ["ID_Producto"],
      order: [[literal("ventas"), "DESC"]],
      limit,
      include: [{ model: models.Producto, as: "producto" }]
    });

    return rows;
  }
}
