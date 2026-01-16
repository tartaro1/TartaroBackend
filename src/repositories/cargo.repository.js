import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class CargoRepository extends BaseRepository {
  constructor() {
    super({ model: models.Cargo, primaryKeyField: "ID_Rol" });
  }
}
