import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class UsuariosRepository extends BaseRepository {
  constructor() {
    super({ model: models.Usuario, primaryKeyField: "ID_Usuario" });
  }
}
