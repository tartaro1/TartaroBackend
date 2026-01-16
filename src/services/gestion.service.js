import { ContenidoInformativoRepository } from "../repositories/contenidoInformativo.repository.js";

export class GestionService {
  constructor({ contenidoInformativoRepository } = {}) {
    this.contenidoInformativoRepository =
      contenidoInformativoRepository || new ContenidoInformativoRepository();
  }

  async getLatest() {
    const rows = await this.contenidoInformativoRepository.findAll({
      order: [["ID_Contenido", "DESC"]],
      limit: 1
    });

    return rows[0] || null;
  }

  normalizeCreateInput(input) {
    return {
      Titulo: input.Titulo ?? input.titulo,
      Contenido: input.Contenido ?? input.contenido
    };
  }

  async create(input) {
    const data = this.normalizeCreateInput(input);
    return this.contenidoInformativoRepository.create(data);
  }
}
