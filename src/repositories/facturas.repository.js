import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class FacturasRepository extends BaseRepository {
  constructor() {
    super({ model: models.Factura, primaryKeyField: "ID_Factura" });
  }
}
