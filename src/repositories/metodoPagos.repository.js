import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class MetodoPagosRepository extends BaseRepository {
  constructor() {
    super({ model: models.MetodoPago, primaryKeyField: "ID_Metodo_Pago" });
  }
}
