import { CopiasSeguridadRepository } from "../repositories/copiasSeguridad.repository.js";

export class BackupsService {
  constructor({ copiasSeguridadRepository } = {}) {
    this.copiasSeguridadRepository =
      copiasSeguridadRepository || new CopiasSeguridadRepository();
  }

  async getLatest() {
    const rows = await this.copiasSeguridadRepository.findAll({
      order: [["FechaHora", "DESC"]],
      limit: 1
    });

    return rows[0] || null;
  }

  normalizeCreateInput(input) {
    return {
      FechaHora: new Date(),
      NombreBD: input.NombreBD ?? input.NombreBd ?? null,
      VersionBD: input.VersionBD ?? input.VersionBd ?? null,
      Tipo: input.Tipo ?? null,
      Ubicacion: input.Ubicacion ?? null,
      Informacion: input.Informacion ?? null
    };
  }

  async create(input) {
    const data = this.normalizeCreateInput(input);
    return this.copiasSeguridadRepository.create(data);
  }
}
