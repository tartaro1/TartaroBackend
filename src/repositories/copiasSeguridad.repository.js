import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class CopiasSeguridadRepository extends BaseRepository {
  constructor() {
    super({ model: models.CopiaSeguridad, primaryKeyField: "ID" });
  }
}
