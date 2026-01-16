import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class ProductosRepository extends BaseRepository {
  constructor() {
    super({ model: models.Producto, primaryKeyField: "id" });
  }
}
