import { BaseRepository } from "./base.repository.js";
import { models } from "../orm/sequelize.js";

export class ContenidoInformativoRepository extends BaseRepository {
  constructor() {
    super({ model: models.ContenidoInformativo, primaryKeyField: "ID_Contenido" });
  }
}
