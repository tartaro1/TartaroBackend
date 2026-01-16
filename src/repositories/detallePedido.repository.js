import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class DetallePedidoRepository extends BaseRepository {
  constructor() {
    super({ model: models.DetallePedido, primaryKeyField: "ID_DetallePedido" });
  }
}
