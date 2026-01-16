import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class ProveedoresRepository extends BaseRepository {
  constructor() {
    super({ model: models.Proveedor, primaryKeyField: "ID_Proveedor" });
  }
}
