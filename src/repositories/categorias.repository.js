import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class CategoriasRepository extends BaseRepository {
  constructor() {
    super({ model: models.Categoria, primaryKeyField: "ID_Categoria" });
  }
}
