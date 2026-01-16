import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class PedidosRepository extends BaseRepository {
  constructor() {
    super({ model: models.Pedido, primaryKeyField: "ID_Pedido" });
  }
}
