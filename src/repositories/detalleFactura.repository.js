import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class DetalleFacturaRepository extends BaseRepository {
  constructor() {
    super({ model: models.DetalleFactura, primaryKeyField: "ID_DetalleFactura" });
  }
}
